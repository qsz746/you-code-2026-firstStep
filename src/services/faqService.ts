import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../app/firebase";

export async function createFAQSubmission(data: {
  question: string;
  answer?: string;
  category?: string;
  submittedBy: string;
  role: string;
}) {
  return await addDoc(collection(db, "faqSubmissions"), {
    question: data.question,
    answer: data.answer ?? "",
    category: data.category ?? "general",
    submittedBy: data.submittedBy,
    role: data.role,
    status: "pending",
    reviewNote: "",
    createdAt: serverTimestamp(),
  });
}

export async function getPendingSubmissions() {
  const q = query(collection(db, "faqSubmissions"), where("status", "==", "pending"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getApprovedFAQs() {
  const q = query(collection(db, "faqs"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ faqId: d.id, ...d.data() }));
}

export async function approveSubmission(submission: any) {
  await updateDoc(doc(db, "faqSubmissions", submission.id), { status: "approved" });

  return await addDoc(collection(db, "faqs"), {
    question: submission.question,
    answer: submission.answer ?? "",
    category: submission.category ?? "general",
    sourceSubmissionId: submission.id,
    createdAt: serverTimestamp(),
    approvedAt: serverTimestamp(),
  });
}

export async function rejectSubmission(submissionId: string, note = "") {
  await updateDoc(doc(db, "faqSubmissions", submissionId), {
    status: "rejected",
    reviewNote: note,
  });
}