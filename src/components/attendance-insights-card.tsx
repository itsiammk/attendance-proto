
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb } from "lucide-react";
import { attendanceInsights, type AttendanceInsightsInput, type AttendanceInsightsOutput } from '@/ai/flows/attendance-insights';

const sampleAttendanceData = {
  summary: {
    total_employees: 50,
    present_today: 40,
    absent_today: 5,
    on_leave_today: 5,
    late_arrivals_this_week: 15,
    average_work_hours_last_month: "7.5 hours/day",
  },
  trends: [
    "Increased absenteeism on Mondays over the past month.",
    "Software department shows highest punctuality.",
    "Overall attendance dropped by 5% compared to last quarter.",
  ],
  potential_issues: [
    "High number of late arrivals in the Sales team might indicate a morale or commute issue.",
    "Consistently low attendance from specific individuals needs investigation.",
  ],
};

export function AttendanceInsightsCard() {
  const [insights, setInsights] = useState<AttendanceInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customData, setCustomData] = useState<string>(JSON.stringify(sampleAttendanceData, null, 2));

  const fetchInsights = async (data: string) => {
    setIsLoading(true);
    setError(null);
    setInsights(null);
    try {
      const input: AttendanceInsightsInput = { attendanceData: data };
      const result = await attendanceInsights(input);
      setInsights(result);
    } catch (e) {
      console.error("Error fetching attendance insights:", e);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial insights with sample data
    fetchInsights(JSON.stringify(sampleAttendanceData, null, 2));
  }, []);

  const handleGenerateInsights = () => {
    try {
      // Validate if customData is valid JSON
      JSON.parse(customData);
      fetchInsights(customData);
    } catch (jsonError) {
      setError("Invalid JSON format in custom data. Please correct it and try again.");
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>AI Attendance Insights</CardTitle>
        </div>
        <CardDescription>
          Get AI-powered analysis of attendance data to identify trends and potential issues.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Generating insights...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {insights && !isLoading && (
          <div className="p-4 bg-muted/50 rounded-md border">
            <h4 className="font-semibold mb-2">Generated Insights:</h4>
            <pre className="whitespace-pre-wrap text-sm bg-background p-3 rounded-md max-h-60 overflow-y-auto">
              {insights.insights}
            </pre>
          </div>
        )}
        <div>
          <label htmlFor="customData" className="block text-sm font-medium mb-1">
            Edit Attendance Data (JSON format):
          </label>
          <Textarea
            id="customData"
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            rows={10}
            placeholder="Enter attendance data in JSON format"
            className="font-code text-xs"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateInsights} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Regenerate Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
