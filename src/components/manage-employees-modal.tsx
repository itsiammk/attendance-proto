
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose, // Added DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PenLine, Trash2, PlusCircle, Users } from "lucide-react" // Added Users icon
import { ScrollArea } from "@/components/ui/scroll-area" // Added ScrollArea

// Placeholder data
const employees = [
  { id: "1", name: "John Doe", role: "Developer", phone: "123-456-7890", avatar: "https://placehold.co/40x40.png?text=JD" },
  { id: "2", name: "Jane Smith", role: "Designer", phone: "987-654-3210", avatar: "https://placehold.co/40x40.png?text=JS" },
  { id: "3", name: "Peter Jones", role: "Manager", phone: "555-123-4567", avatar: "https://placehold.co/40x40.png?text=PJ" },
  { id: "4", name: "Alice Wonderland", role: "Engineer", phone: "555-987-6543", avatar: "https://placehold.co/40x40.png?text=AW" },
  { id: "5", name: "Bob The Builder", role: "Technician", phone: "555-456-7890", avatar: "https://placehold.co/40x40.png?text=BB" },
];

export function ManageEmployeesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Users className="mr-2 h-4 w-4" /> Manage Employees</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Employees</DialogTitle>
          <DialogDescription>
            Add, edit, or remove employees from your company.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2 flex-grow overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar */}
            <div className="space-y-3 p-1 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold px-3 pt-2 sm:px-4 sm:pt-3">Add New Employee</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4">
                <div className="w-full">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Employee Name" />
                </div>
                <div className="w-full">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Phone Number" />
                </div>
                <div className="w-full">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Job Title / Role" />
                </div>
                <div className="w-full">
                    <Label htmlFor="pin">PIN</Label>
                    <Input id="pin" type="password" placeholder="4-digit PIN" />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                </div>
                </form>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2 px-1">Current Employees</h3>
                <div className="rounded-md border">
                <ScrollArea className="h-[250px] sm:h-[300px]"> {/* Added ScrollArea for table */}
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="py-2 px-2 sm:px-4">Name</TableHead>
                        <TableHead className="hidden sm:table-cell py-2 px-2 sm:px-4">Role</TableHead>
                        <TableHead className="hidden md:table-cell py-2 px-2 sm:px-4">Phone</TableHead>
                        <TableHead className="text-right py-2 px-2 sm:px-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className="py-2 px-2 sm:px-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee avatar" />
                                <AvatarFallback>{employee.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs sm:text-sm">{employee.name}</span>
                            </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm">{employee.role}</TableCell>
                            <TableCell className="hidden md:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm">{employee.phone}</TableCell>
                            <TableCell className="text-right py-2 px-2 sm:px-4">
                            <Button variant="ghost" size="icon" className="mr-1 h-7 w-7 sm:h-8 sm:w-8">
                                <PenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-7 w-7 sm:h-8 sm:w-8">
                                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </ScrollArea>
                </div>
            </div>
        </div>

        <DialogFooter className="mt-auto pt-4 border-t"> {/* Ensure footer is at bottom */}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
