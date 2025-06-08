"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PenLine, Trash2, PlusCircle } from "lucide-react"

// Placeholder data
const employees = [
  { id: "1", name: "John Doe", role: "Developer", phone: "123-456-7890", avatar: "https://placehold.co/40x40.png?text=JD" },
  { id: "2", name: "Jane Smith", role: "Designer", phone: "987-654-3210", avatar: "https://placehold.co/40x40.png?text=JS" },
];

export function ManageEmployeesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Employees</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Manage Employees</DialogTitle>
          <DialogDescription>
            Add, edit, or remove employees from your company.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4 p-1 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold px-4 pt-3">Add New Employee</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Employee Name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Phone Number" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Job Title / Role" />
              </div>
              <div>
                <Label htmlFor="pin">PIN</Label>
                <Input id="pin" type="password" placeholder="4-digit PIN" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Employees</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee avatar" />
                            <AvatarFallback>{employee.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          {employee.name}
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-1">
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { /* Close dialog */ }}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
