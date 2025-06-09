
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PenLine, Trash2, PlusCircle, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
        <Button className="h-10"><Users className="mr-2 h-4 w-4" /> Manage Employees</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl">Manage Employees</DialogTitle>
          <DialogDescription className="text-sm sm:text-base mt-1">
            Add, edit, or remove employees from your company.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 px-6 flex-grow overflow-y-auto">
            <div className="space-y-3 p-4 rounded-lg border shadow-sm bg-muted/30">
                <h3 className="text-lg font-semibold">Add New Employee</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Employee Name" className="h-9"/>
                </div>
                <div className="w-full space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Phone Number" className="h-9"/>
                </div>
                <div className="w-full space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Job Title / Role" className="h-9"/>
                </div>
                <div className="w-full space-y-1.5">
                    <Label htmlFor="pin">PIN</Label>
                    <Input id="pin" type="password" placeholder="4-digit PIN" className="h-9"/>
                </div>
                <div className="sm:col-span-2 flex justify-end pt-2">
                    <Button type="submit" className="w-full sm:w-auto h-9">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                </div>
                </form>
            </div>
            
            <div className="pt-2">
                <h3 className="text-lg font-semibold mb-3">Current Employees</h3>
                <div className="rounded-md border overflow-x-auto">
                    <ScrollArea className="h-[250px] sm:h-[300px] w-full">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="py-2.5 px-3 sm:px-4 min-w-[180px]">Name</TableHead>
                            <TableHead className="py-2.5 px-3 sm:px-4 min-w-[120px]">Role</TableHead>
                            <TableHead className="py-2.5 px-3 sm:px-4 min-w-[130px]">Phone</TableHead>
                            <TableHead className="text-right py-2.5 px-3 sm:px-4 min-w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell className="py-2 px-3 sm:px-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                                    <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee avatar" />
                                    <AvatarFallback>{employee.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{employee.name}</span>
                                </div>
                                </TableCell>
                                <TableCell className="py-2 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{employee.role}</TableCell>
                                <TableCell className="py-2 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{employee.phone}</TableCell>
                                <TableCell className="text-right py-2 px-3 sm:px-4">
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

        <DialogFooter className="mt-auto p-6 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="h-9">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
