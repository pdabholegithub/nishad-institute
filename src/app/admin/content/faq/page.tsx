import prisma from "@/lib/prisma";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

async function addFAQ(formData: FormData) {
  "use server";
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  
  await prisma.fAQ.create({
    data: { question, answer, order: 0 }
  });
  revalidatePath("/admin/content/faq");
  revalidatePath("/");
}

async function deleteFAQ(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/admin/content/faq");
  revalidatePath("/");
}

export default async function AdminFAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Manage FAQ</h1>
          <p className="text-sm text-slate-500">Add or remove frequently asked questions shown on the landing page.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm sticky top-24">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Add New FAQ
            </h3>
            <form action={addFAQ} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <input 
                  name="question" 
                  required 
                  placeholder="e.g. Do I get a certificate?"
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <textarea 
                  name="answer" 
                  required 
                  rows={4}
                  placeholder="e.g. Yes, you will receive an industry-recognized certificate..."
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <button className="w-full rounded-md bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">
                Add FAQ
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {faqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed text-slate-500">
              <HelpCircle className="h-12 w-12 mb-2 opacity-20" />
              <p>No FAQs added yet.</p>
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
                  </div>
                  <form action={deleteFAQ}>
                    <input type="hidden" name="id" value={faq.id} />
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
