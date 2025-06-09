
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, CalendarDays, Clock, Loader2, Briefcase, User, ListChecks, MapPin, Camera as CameraIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recordCheckIn, recordCheckOut } from "@/app/employee/actions";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';
import { Label } from "@/components/ui/label"; // Added import

type AttendanceStatus = "Checked In" | "Checked Out" | "Not Checked In";
type ActionType = "check-in" | "check-out";
interface CapturedLocation {
  latitude: number;
  longitude: number;
}

export default function EmployeeDashboardPage() {
  const employeeName = "Jane Doe"; // Placeholder
  const { toast } = useToast();

  const [employeeActionStatus, setEmployeeActionStatus] = useState<AttendanceStatus>("Not Checked In");
  const [lastActionDisplayTime, setLastActionDisplayTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for selfie/location modal
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);
  const [capturedLocation, setCapturedLocation] = useState<CapturedLocation | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false); // For selfie capture spinner
  const [isLocating, setIsLocating] = useState(false); // For location spinner

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let streamRef = useRef<MediaStream | null>(null);


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('employeeAttendanceStatus') as AttendanceStatus | null;
    const storedTimestamp = localStorage.getItem('employeeLastActionTimestamp');

    if (storedStatus) {
      setEmployeeActionStatus(storedStatus);
    }
    if (storedTimestamp) {
      try {
        const dateObj = new Date(storedTimestamp);
        if (!isNaN(dateObj.getTime())) {
          setLastActionDisplayTime(formatTime(dateObj));
        } else {
          localStorage.removeItem('employeeLastActionTimestamp');
        }
      } catch (error) {
        console.error("Error parsing stored timestamp:", error);
        localStorage.removeItem('employeeLastActionTimestamp');
      }
    }
  }, []);

  const resetCaptureState = () => {
    setCapturedSelfie(null);
    setCapturedLocation(null);
    setHasCameraPermission(null);
    setCameraError(null);
    setLocationError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const requestCameraPermission = async () => {
    resetCaptureState(); // Ensure clean state before requesting
    setHasCameraPermission(null); // Indicate loading state for permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
      setCameraError(null);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setCameraError('Camera access denied. Please enable camera permissions in your browser settings.');
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions.',
      });
    }
  };

  useEffect(() => {
    if (showCaptureModal && !capturedSelfie && hasCameraPermission === null) {
      requestCameraPermission();
    }
    // Cleanup camera stream when modal is closed or selfie is taken
    return () => {
      if (streamRef.current && (!showCaptureModal || capturedSelfie)) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
         if (videoRef.current) {
            videoRef.current.srcObject = null;
         }
      }
    };
  }, [showCaptureModal, capturedSelfie, hasCameraPermission]);


  const handleOpenCaptureModal = (actionType: ActionType) => {
    setCurrentActionType(actionType);
    resetCaptureState();
    setShowCaptureModal(true);
  };
  
  const handleCaptureSelfie = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setCapturedSelfie(dataUri);
        // Stop camera stream after capture
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
         if (videoRef.current) {
            videoRef.current.srcObject = null;
         }
         setHasCameraPermission(null); // So it doesn't show video feed anymore
      }
      setIsCapturing(false);
    } else {
       toast({ variant: "destructive", title: "Error", description: "Camera not ready for capture." });
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCapturedLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Could not get location. Please ensure location services are enabled and permissions are granted.');
          toast({ variant: "destructive", title: "Location Error", description: "Could not retrieve location." });
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      toast({ variant: "destructive", title: "Location Error", description: "Geolocation not supported." });
      setIsLocating(false);
    }
  };
  
  const handleConfirmPunch = async () => {
    if (!capturedSelfie || !capturedLocation || !currentActionType) {
      toast({ variant: "destructive", title: "Error", description: "Selfie and location are required." });
      return;
    }
    setIsSubmitting(true);
    
    const actionData = {
      selfieDataUri: capturedSelfie,
      location: capturedLocation,
    };

    try {
      const result = currentActionType === "check-in" 
        ? await recordCheckIn(actionData) 
        : await recordCheckOut(actionData);

      if (result.success && result.timestamp) {
        const currentTime = new Date(result.timestamp);
        setEmployeeActionStatus(currentActionType === "check-in" ? "Checked In" : "Checked Out");
        setLastActionDisplayTime(formatTime(currentTime));
        localStorage.setItem('employeeAttendanceStatus', currentActionType === "check-in" ? "Checked In" : "Checked Out");
        localStorage.setItem('employeeLastActionTimestamp', currentTime.toISOString());
        toast({ title: "Success", description: `Successfully ${currentActionType === "check-in" ? "checked in" : "checked out"}.` });
        setShowCaptureModal(false);
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message || `Failed to ${currentActionType}.` });
      }
    } catch (error) {
      console.error(`${currentActionType} error:`, error);
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };


  const displayStatusText = employeeActionStatus;
  const displayTimeText = lastActionDisplayTime;
  const displayLocationText = employeeActionStatus === "Checked In" ? "Main Office (GPS Mock)" : "N/A"; // This would be dynamic later

  const upcomingLeave = null; // or { type: "Annual Leave", dates: "Jul 20 - Jul 25" }

  return (
    <div className="space-y-6 sm:space-y-8"> 
      <div className="mb-6 sm:mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Welcome, {employeeName}!</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Your attendance overview and quick actions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-headline">Today's Status</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Your current check-in information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/60 rounded-lg">
              <div>
                <p className="font-semibold text-base sm:text-lg">{displayStatusText}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{displayTimeText || "N/A"}</p>
              </div>
              {employeeActionStatus === "Checked In" ? (
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
              ) : employeeActionStatus === "Checked Out" ? (
                <XCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
              ) : (
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground pl-1 gap-1.5">
                <MapPin className="h-3.5 w-3.5"/> 
                <span>{displayLocationText}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                className="w-full text-sm sm:text-base py-2.5 h-10"
                onClick={() => handleOpenCaptureModal("check-in")}
                disabled={employeeActionStatus === "Checked In" || isSubmitting}
              >
                {isSubmitting && currentActionType === "check-in" ? <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>}
                Check In
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm sm:text-base py-2.5 h-10"
                onClick={() => handleOpenCaptureModal("check-out")}
                disabled={employeeActionStatus !== "Checked In" || isSubmitting}
              >
                {isSubmitting && currentActionType === "check-out" ? <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <XCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>}
                 Check Out
              </Button>
            </div>
             <Button variant="link" className="w-full px-1 justify-start text-xs sm:text-sm text-primary hover:underline h-auto py-1">View Full Day Log</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle  className="text-lg sm:text-xl font-headline">Upcoming Leave</CardTitle>
             <CardDescription className="text-sm sm:text-base mt-1">Your approved time off.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-98px)] justify-between p-4 sm:p-6"> 
            {upcomingLeave ? (
              <div className="p-3 sm:p-4 bg-muted/60 rounded-lg">
                <p className="font-semibold text-sm sm:text-base">{upcomingLeave.type}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{upcomingLeave.dates}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center grow py-4">
                <CalendarDays className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-2 sm:mb-3" />
                <p className="text-muted-foreground text-sm">No upcoming leaves scheduled.</p>
              </div>
            )}
            <Button variant="outline" className="w-full mt-auto text-sm sm:text-base py-2.5 h-10"> 
              <Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/> Apply for Leave
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-headline">Quick Links</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">Access common actions and information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:gap-3 pt-4 p-4 sm:p-6"> 
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/attendance" className="flex items-center w-full"><ListChecks className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> View My Attendance</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/leaves" className="flex items-center w-full"><Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> View My Leaves</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <Link href="/employee/profile" className="flex items-center w-full"><User className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> Update My Profile</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-sm sm:text-base py-2.5 h-auto px-3">
                <CalendarDays className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"/> Company Holiday Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Hidden canvas for selfie capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Capture Modal */}
      <Dialog open={showCaptureModal} onOpenChange={(isOpen) => {
          if (!isOpen) {
              resetCaptureState(); // Clean up when dialog is closed
          }
          setShowCaptureModal(isOpen);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-headline">
              {currentActionType === "check-in" ? "Check In" : "Check Out"} Verification
            </DialogTitle>
            <DialogDescription>
              Please capture a selfie and allow location access to proceed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Camera View / Selfie Display */}
            {!capturedSelfie && (
              <div className="space-y-2">
                <Label>Camera Preview</Label>
                <div className="w-full aspect-video bg-muted rounded-md overflow-hidden relative flex items-center justify-center">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  {hasCameraPermission === null && !cameraError && <Loader2 className="h-8 w-8 animate-spin text-primary absolute" />}
                </div>
                {cameraError && (
                  <Alert variant="destructive">
                    <CameraIcon className="h-4 w-4" />
                    <AlertTitle>Camera Error</AlertTitle>
                    <AlertDescription>{cameraError} <Button variant="link" size="sm" className="p-0 h-auto" onClick={requestCameraPermission}><RefreshCw className="mr-1 h-3 w-3" />Retry</Button></AlertDescription>
                  </Alert>
                )}
                <Button 
                  onClick={handleCaptureSelfie} 
                  disabled={!hasCameraPermission || isCapturing} 
                  className="w-full h-10"
                >
                  {isCapturing ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <CameraIcon className="mr-2 h-5 w-5" />}
                  Capture Selfie
                </Button>
              </div>
            )}

            {/* Selfie Preview */}
            {capturedSelfie && (
              <div className="space-y-2">
                <Label>Selfie Captured</Label>
                <div className="w-full aspect-video bg-muted rounded-md overflow-hidden relative border">
                  <Image src={capturedSelfie} alt="Captured selfie" layout="fill" objectFit="contain" />
                </div>
                {!capturedLocation && (
                   <Button 
                    onClick={handleGetLocation} 
                    disabled={isLocating} 
                    className="w-full h-10 mt-2"
                  >
                    {isLocating ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <MapPin className="mr-2 h-5 w-5" />}
                    Get Location
                  </Button>
                )}
                {locationError && (
                  <Alert variant="destructive" className="mt-2">
                    <MapPin className="h-4 w-4" />
                    <AlertTitle>Location Error</AlertTitle>
                    <AlertDescription>{locationError} <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleGetLocation}><RefreshCw className="mr-1 h-3 w-3" />Retry</Button></AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {/* Location Display */}
            {capturedSelfie && capturedLocation && (
              <div className="space-y-1 text-sm p-3 bg-muted/50 rounded-md">
                <p className="font-medium">Location Captured:</p>
                <p className="text-xs">Latitude: {capturedLocation.latitude.toFixed(5)}</p>
                <p className="text-xs">Longitude: {capturedLocation.longitude.toFixed(5)}</p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto h-10">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleConfirmPunch} 
              disabled={!capturedSelfie || !capturedLocation || isSubmitting}
              className="w-full sm:w-auto h-10"
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : (currentActionType === "check-in" ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />)}
              Confirm {currentActionType === "check-in" ? "Check In" : "Check Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    
