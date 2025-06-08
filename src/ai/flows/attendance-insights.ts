// 'use server';
/**
 * @fileOverview AI-powered analysis of attendance data to identify trends and issues.
 *
 * - attendanceInsights - A function that generates insights from attendance data.
 * - AttendanceInsightsInput - The input type for the attendanceInsights function.
 * - AttendanceInsightsOutput - The return type for the attendanceInsights function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttendanceInsightsInputSchema = z.object({
  attendanceData: z.string().describe('Attendance data in JSON format.'),
});

export type AttendanceInsightsInput = z.infer<typeof AttendanceInsightsInputSchema>;

const AttendanceInsightsOutputSchema = z.object({
  insights: z.string().describe('Insights and analysis of the attendance data.'),
});

export type AttendanceInsightsOutput = z.infer<typeof AttendanceInsightsOutputSchema>;

export async function attendanceInsights(input: AttendanceInsightsInput): Promise<AttendanceInsightsOutput> {
  return attendanceInsightsFlow(input);
}

const attendanceInsightsPrompt = ai.definePrompt({
  name: 'attendanceInsightsPrompt',
  input: {schema: AttendanceInsightsInputSchema},
  output: {schema: AttendanceInsightsOutputSchema},
  prompt: `Analyze the following attendance data and provide insights on trends, potential issues, and areas for improvement.\n\nAttendance Data: {{{attendanceData}}}`,
});

const attendanceInsightsFlow = ai.defineFlow(
  {
    name: 'attendanceInsightsFlow',
    inputSchema: AttendanceInsightsInputSchema,
    outputSchema: AttendanceInsightsOutputSchema,
  },
  async input => {
    const {output} = await attendanceInsightsPrompt(input);
    return output!;
  }
);
