import prisma from "@/lib/prisma";
import { Quote, Plus, Trash2, Star } from "lucide-react";
import { revalidatePath } from "next/cache";

async function addTestimonial(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const text = formData.get("text") as string;
  const rating = parseInt(formData.get("rating") as string || "5");
  
  await prisma.testimonial.create({
    data: { name, role, text, rating }
  });
  revalidatePath("/admin/content/testimonials");
  revalidatePath("/");
}

async function deleteTestimonial(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/content/testimonials");
  revalidatePath("/");
}

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Manage Testimonials</h1>
          <p className="text-sm text-slate-500">Manage student feedback shown in the "What Our Students Say" section.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm sticky top-24">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" /> Add Testimonial
            </h3>
            <form action={addTestimonial} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student Name</label>
                <input 
                  name="name" 
                  required 
                  placeholder="e.g. John Doe"
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role / Company</label>
                <input 
                  name="role" 
                  required 
                  placeholder="e.g. QA Engineer at Google"
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating (1-5)</label>
                <select 
                  name="rating" 
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Testimonial Text</label>
                <textarea 
                  name="text" 
                  required 
                  rows={4}
                  placeholder="The best training I've ever received..."
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <button className="w-full rounded-md bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">
                Save Testimonial
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed text-slate-500">
              <Quote className="h-12 w-12 mb-2 opacity-20" />
              <p>No testimonials added yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4">"{t.text}"</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-[10px] text-slate-500">{t.role}</p>
                    </div>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}
