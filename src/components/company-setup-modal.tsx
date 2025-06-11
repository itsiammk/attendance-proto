
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getAddressFromCoordinates } from "@/lib/locationService";
import { Loader2, MapPin, Edit3 } from "lucide-react";

const companySetupSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  yourName: z.string().min(2, { message: "Your name must be at least 2 characters." }),
  yourRole: z.string().min(2, { message: "Your role must be at least 2 characters." }),
  staffCount: z.coerce.number().min(1, { message: "Staff count must be at least 1." }),
  businessType: z.string().min(1, { message: "Please select a business type." }),
  locationMethod: z.enum(["gps", "manual"]),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
});

export type CompanySetupFormValues = z.infer<typeof companySetupSchema>;

interface CompanySetupModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSetupComplete: (data: CompanySetupFormValues) => void;
}

export function CompanySetupModal({ isOpen, onOpenChange, onSetupComplete }: CompanySetupModalProps) {
  const { toast } = useToast();
  const [isFetchingLocation, setIsFetchingLocation] = React.useState(false);

  const form = useForm<CompanySetupFormValues>({
    resolver: zodResolver(companySetupSchema),
    defaultValues: {
      companyName: "",
      yourName: "",
      yourRole: "",
      staffCount: 1,
      businessType: "",
      locationMethod: "gps",
      address: "",
    },
  });

  const locationMethod = form.watch("locationMethod");

  React.useEffect(() => {
    if (locationMethod === "gps" && isOpen) {
      handleFetchGpsAddress();
    } else if (locationMethod === "manual") {
      form.setValue("address", ""); // Clear address if switching to manual
    }
  }, [locationMethod, isOpen]);

  const handleFetchGpsAddress = async () => {
    setIsFetchingLocation(true);
    form.setValue("address", "Attempting to fetch address...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const fetchedAddress = await getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );
            form.setValue("address", fetchedAddress);
            toast({ title: "Location Found", description: "Address automatically populated." });
          } catch (error) {
            form.setValue("address", "Could not fetch address. Please enter manually or try again.");
            toast({ variant: "destructive", title: "Geocoding Error", description: "Could not convert coordinates to address." });
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          form.setValue("address", "GPS access denied. Please enter manually or enable permissions.");
          toast({
            variant: "destructive",
            title: "GPS Error",
            description: "Could not get location. Ensure permissions are enabled.",
          });
          setIsFetchingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      form.setValue("address", "GPS not supported. Please enter manually.");
      toast({ variant: "destructive", title: "GPS Error", description: "Geolocation is not supported by your browser." });
      setIsFetchingLocation(false);
    }
  };

  const onSubmit = (data: CompanySetupFormValues) => {
    console.log("Company Setup Data:", data);
    onSetupComplete(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-headline">Setup Your Company</DialogTitle>
          <DialogDescription className="text-sm sm:text-base mt-1">
            Tell us a bit about your company to get started.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
            <div className="space-y-1.5">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...form.register("companyName")} placeholder="Your Company LLC" className="h-10"/>
              {form.formState.errors.companyName && (
                <p className="text-xs text-destructive">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="yourName">Your Name</Label>
                <Input id="yourName" {...form.register("yourName")} placeholder="e.g., John Doe" className="h-10"/>
                {form.formState.errors.yourName && (
                  <p className="text-xs text-destructive">{form.formState.errors.yourName.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="yourRole">Your Role</Label>
                <Input id="yourRole" {...form.register("yourRole")} placeholder="e.g., Owner, HR Manager" className="h-10"/>
                 {form.formState.errors.yourRole && (
                  <p className="text-xs text-destructive">{form.formState.errors.yourRole.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="staffCount">Number of Staff</Label>
                    <Input id="staffCount" type="number" {...form.register("staffCount")} className="h-10"/>
                    {form.formState.errors.staffCount && (
                    <p className="text-xs text-destructive">{form.formState.errors.staffCount.message}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select onValueChange={(value) => form.setValue("businessType", value)} defaultValue={form.getValues("businessType")}>
                        <SelectTrigger id="businessType" className="w-full h-10">
                        <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="it">IT / Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {form.formState.errors.businessType && (
                        <p className="text-xs text-destructive">{form.formState.errors.businessType.message}</p>
                    )}
                </div>
            </div>
            
            <div className="space-y-2">
              <Label>Location Method</Label>
              <RadioGroup
                defaultValue="gps"
                onValueChange={(value: "gps" | "manual") => form.setValue("locationMethod", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gps" id="gps" />
                  <Label htmlFor="gps" className="font-normal">Auto-detect (GPS)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual" className="font-normal">Enter Manually</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Company Address</Label>
              <Textarea
                id="address"
                {...form.register("address")}
                placeholder={locationMethod === "gps" ? "Fetching address via GPS..." : "123 Main St, Anytown, USA"}
                className="min-h-[80px]"
                disabled={locationMethod === "gps" && isFetchingLocation}
                readOnly={locationMethod === "gps" && !isFetchingLocation}
              />
              {locationMethod === "gps" && !isFetchingLocation && (
                <Button type="button" variant="outline" size="sm" onClick={handleFetchGpsAddress} className="text-xs h-7">
                    <MapPin className="mr-1.5 h-3.5 w-3.5" /> Re-fetch GPS Address
                </Button>
              )}
               {locationMethod === "gps" && isFetchingLocation && (
                <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching address...
                </div>
              )}
              {form.formState.errors.address && (
                <p className="text-xs text-destructive">{form.formState.errors.address.message}</p>
              )}
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="p-6 pt-4 border-t">
          <Button 
            type="submit" 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={form.formState.isSubmitting || isFetchingLocation}
            className="w-full sm:w-auto h-10"
          >
            {form.formState.isSubmitting || isFetchingLocation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Edit3 className="mr-2 h-4 w-4" />
            )}
            Save &amp; Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

