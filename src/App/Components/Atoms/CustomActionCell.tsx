import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { Key } from 'react'
import EllipsisVerticalIcon from '../../../Assets/Icons/EllipsisVerticalIcon'

interface CustomActionCellProps {
    item: Record<string, any>;
    columnKey: Key;
 }

const CustomActionCell = (props : CustomActionCellProps) => {
  
    return (
    <div className="relative flex items-center gap-2">
                  <Dropdown className="bg-background border-1 border-default-200">
                     <DropdownTrigger>
                        <Button isIconOnly radius="full" color='secondary' variant="light">
                           <EllipsisVerticalIcon />
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu className='dark:text-light'>
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
               </div>
  )
}

export default CustomActionCell