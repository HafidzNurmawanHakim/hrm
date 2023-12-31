import {
	FC,
	Key,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import {
	Link,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
	Selection,
	Pagination,
} from "@nextui-org/react";
import TableEmptyContent from "../Components/Atoms/TableEmptyContent";
import { users, statusOptions } from "../../Assets/data";

export type Column = {
	key: string | number;
	name: string;
	sortable?: boolean;
	render?: (item: Record<Columnskey, any>, columnKey: Key) => ReactNode;
};

type Columns = Column[];
type Columnskey = Columns[number]["key"];

interface TableProviderProps {
	columns: Columns;
	data: Array<Record<Columnskey, any>>;
}
const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

const CustomTable: FC<TableProviderProps> = ({ columns, data }) => {
	const [page, setPage] = useState(1);
	const [filterValue, setFilterValue] = useState("");
	const [statusFilter, setStatusFilter] = useState<Selection>("all");
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "age",
		direction: "ascending",
	});
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);

	const hasSearchFilter = Boolean(filterValue);
	const pages = Math.ceil(users.length / rowsPerPage);

	const filteredItems = useMemo(() => {
		let filteredUsers = [...data];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusOptions.length
		) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status)
			);
		}

		return filteredUsers;
	}, [users, filterValue, statusFilter]);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.key)
		);
	}, [visibleColumns]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort(
			(a: Record<Columnskey, any>, b: Record<Columnskey, any>) => {
				const first = a[
					sortDescriptor.column as keyof Record<Columnskey, any>
				] as number;
				const second = b[
					sortDescriptor.column as keyof Record<Columnskey, any>
				] as number;
				const cmp = first < second ? -1 : first > second ? 1 : 0;

				return sortDescriptor.direction === "descending" ? -cmp : cmp;
			}
		);
	}, [sortDescriptor, items]);

	const renderCell = useCallback((item: Record<string, any>, columnKey: Key) => {
		const columnIndex = columns?.findIndex((col) => col.key === columnKey);
		const CustomRender = columns[columnIndex].render;

		if (CustomRender) {
			return CustomRender(item, columnKey);
		} else {
			return getKeyValue(item, columnKey);
		}
	}, []);

	const classNames = useMemo(
		() => ({
			wrapper: [
				"max-h-[382px]",
				"bg-white shadow-none dark:bg-background dark:text-light",
			],
			th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
			td: [
				// changing the rows border radius
				// first
				"group-data-[first=true]:first:before:rounded-none",
				"group-data-[first=true]:last:before:rounded-none",
				// middle
				"group-data-[middle=true]:before:rounded-none",
				// last
				"group-data-[last=true]:first:before:rounded-none",
				"group-data-[last=true]:last:before:rounded-none",
			],
			tr: ["cursor-pointer "],
		}),
		[]
	);

	const bottomContent = useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					showControls
					classNames={{
						item: "bg-light dark:bg-background",
					}}
					color="secondary"
					isDisabled={hasSearchFilter}
					page={page}
					total={pages}
					variant="light"
					onChange={setPage}
				/>
				<span className="text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${items.length} selected`}
				</span>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	return (
		<div className="">
			<Table
				aria-label="Example table with dynamic content"
				onSortChange={setSortDescriptor}
				sortDescriptor={sortDescriptor}
				onSelectionChange={setSelectedKeys}
				selectionMode="multiple"
				classNames={classNames}
				bottomContent={bottomContent}
				color="primary"
				checkboxesProps={{
					classNames: {
						wrapper: "after:bg-foreground after:text-background text-background",
					},
				}}
			>
				<TableHeader columns={headerColumns}>
					{(column) => (
						<TableColumn
							key={column.key}
							align={column.key === "actions" ? "center" : "start"}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={sortedItems} emptyContent={<TableEmptyContent />}>
					{(item) => {
						return (
							<TableRow key={item.key}>
								{(columnKey) => {
									return <TableCell>{renderCell(item, columnKey)}</TableCell>;
								}}
							</TableRow>
						);
					}}
				</TableBody>
			</Table>
		</div>
	);
};

export default CustomTable;
