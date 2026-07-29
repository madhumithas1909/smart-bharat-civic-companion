import type { Complaint, ComplaintStatus, TimelineEvent } from '../types';

export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SB-${year}-${random}`;
}

export function createTimeline(status: ComplaintStatus, note: string): TimelineEvent {
  return { status, timestamp: new Date().toISOString(), note };
}

const STORAGE_KEY = 'smart-bharat-complaints';

export function getComplaints(): Complaint[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveComplaint(complaint: Complaint): void {
  const complaints = getComplaints();
  complaints.unshift(complaint);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

export function getComplaintById(id: string): Complaint | undefined {
  return getComplaints().find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export const statusOrder: ComplaintStatus[] = ['Received', 'Under Review', 'Assigned', 'Resolved'];

export function getStatusIndex(status: ComplaintStatus): number {
  return statusOrder.indexOf(status);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
