import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../app/firebase";

export async function createFAQSubmission(data: {
  question: string;
  answer?: string;
  category?: string;
  submittedBy: string;
  role: string;
  whatHappened?: string;
}) {
  return await addDoc(collection(db, "faqSubmissions"), {
    question: data.question,
    answer: data.answer ?? "",
    category: data.category ?? "general",
    submittedBy: data.submittedBy,
    role: data.role,
    status: "pending",
    isApprove: 0,
    whatHappened: data.whatHappened ?? "",
    reviewNote: "",
    createdAt: serverTimestamp(),
  });
}

export async function getPendingSubmissions() {
  const q = query(collection(db, "faqSubmissions"), where("status", "==", "pending"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getUnapprovedSubmissionsCount() {
  const q = query(collection(db, "faqSubmissions"), where("isApprove", "==", 0));
  const snapshot = await getDocs(q);
  return snapshot.size;
}

export async function getApprovedFAQs() {
  const q = query(collection(db, "faqSubmissions"), where("isApprove", "==", 1));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function approveSubmission(submissionId: string) {
  await updateDoc(doc(db, "faqSubmissions", submissionId), {
    status: "approved",
    isApprove: 1,
    approvedAt: serverTimestamp(),
  });
}

export async function rejectSubmission(submissionId: string, note = "") {
  await updateDoc(doc(db, "faqSubmissions", submissionId), {
    status: "rejected",
    isApprove: 0,
    reviewNote: note,
    rejectedAt: serverTimestamp(),
  });
}

export async function getSubmissionById(submissionId: string) {
  const snapshot = await getDoc(doc(db, "faqSubmissions", submissionId));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function updateSubmission(submissionId: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, "faqSubmissions", submissionId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
