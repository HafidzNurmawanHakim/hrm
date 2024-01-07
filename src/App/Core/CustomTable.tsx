import { FC, Key, ReactNode, useCallback, useMemo, useState } from "react";
import {
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
   Input,
   Dropdown,
   DropdownTrigger,
   Button,
   DropdownMenu,
   DropdownItem,
} from "@nextui-org/react";
import TableEmptyContent from "../Components/Atoms/TableEmptyContent";
import { users, statusOptions } from "../../Assets/data";
import SearchIcon from "../../Assets/Icons/SearchIcon";
import ChevronDownIcon from "../../Assets/Icons/ChevronDownIcon";
import { capitalize } from "../Library/utils/helper";
import PlusIcon from "../../Assets/Icons/PlusIcon";

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
   title?: string;
   enableSelect?: boolean;
}
const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

const CustomTable: FC<TableProviderProps> = ({ columns, data, title, enableSelect = false }) => {
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
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
         filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status)
         );
      }

      return filteredUsers;
   }, [users, filterValue, statusFilter]);

   const headerColumns = useMemo(() => {
      if (visibleColumns === "all") return columns;

      return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
   }, [visibleColumns]);

   const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
   }, [page, filteredItems, rowsPerPage]);

   const sortedItems = useMemo(() => {
      return [...items].sort((a: Record<Columnskey, any>, b: Record<Columnskey, any>) => {
         const first = a[sortDescriptor.column as keyof Record<Columnskey, any>] as number;
         const second = b[sortDescriptor.column as keyof Record<Columnskey, any>] as number;
         const cmp = first < second ? -1 : first > second ? 1 : 0;

         return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
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

   const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
   }, []);

   const onSearchChange = useCallback((value?: string) => {
      if (value) {
         setFilterValue(value);
         setPage(1);
      } else {
         setFilterValue("");
      }
   }, []);


   const topContent = useMemo(() => {
      return (
         <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
               {title}
               <div className="flex gap-3">
                  <Dropdown>
                     <DropdownTrigger className="hidden sm:flex">
                        <Button
                           endContent={<ChevronDownIcon className="text-small" />}
                           size="sm"
                           variant="flat"
                        >
                           Status
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={setStatusFilter}
                     >
                        {statusOptions.map((status) => (
                           <DropdownItem key={status.uid} className="capitalize dark:text-light">
                              {capitalize(status.name)}
                           </DropdownItem>
                        ))}
                     </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                     <DropdownTrigger className="hidden sm:flex">
                        <Button
                           endContent={<ChevronDownIcon className="text-small" />}
                           size="sm"
                           variant="flat"
                        >
                           Columns
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                     >
                        {columns.map((column) => (
                           <DropdownItem key={column.key} className="capitalize dark:text-light">
                              {capitalize(column.name)}
                           </DropdownItem>
                        ))}
                     </DropdownMenu>
                  </Dropdown>
                  <Button
                  color="secondary"
                     className="dark:text-light"
                     endContent={<PlusIcon />}
                     size="sm"
                  >
                     Add New
                  </Button>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-small">Total {users.length} users</span>
               <label className="flex items-center text-small">
                  Rows per page:
                  <select
                     className="bg-transparent outline-none text-small"
                     onChange={onRowsPerPageChange}
                  >
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                  </select>
               </label>
            </div>
         </div>
      );
   }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      users.length,
      hasSearchFilter,
   ]);

   const classNames = useMemo(
      () => ({
         wrapper: [ "bg-white shadow-none dark:bg-background dark:text-light"],
         th: ["text-default-500"],
         // td: [
         //    // changing the rows border radius
         //    // first
         //    "group-data-[first=true]:first:before:rounded-none",
         //    "group-data-[first=true]:last:before:rounded-none",
         //    // middle
         //    "group-data-[middle=true]:before:rounded-none",
         //    // last
         //    "group-data-[last=true]:first:before:rounded-none",
         //    "group-data-[last=true]:last:before:rounded-none",
         // ],
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

  

   return (
      <div className="">
         <Table
            isStriped
            aria-label="Example table with dynamic content"
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            selectionMode={enableSelect ? "multiple" : "none"}
            classNames={classNames}
            topContent={topContent}
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
