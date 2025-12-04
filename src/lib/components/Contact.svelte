<script lang="ts">
import { Motion } from "svelte-motion";
import { inview } from "svelte-inview";
import {
	Mail,
	Phone,
	Send,
	Github,
	Linkedin,
	ArrowRight,
	Check,
} from "lucide-svelte";
import Reveal from "./Reveal.svelte";

let formState: "idle" | "submitting" | "success" | "error" = "idle";

const handleSubmit = async (e: Event) => {
	e.preventDefault();
	formState = "submitting";

	// Simulate form submission
	setTimeout(() => {
		formState = "success";
		setTimeout(() => {
			formState = "idle";
			(e.target as HTMLFormElement).reset();
		}, 3000);
	}, 1500);
};

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "khyogeun_@naver.com",
		href: "mailto:khyogeun_@naver.com",
		color: "text-blue-500",
		bg: "bg-blue-50",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+82 10-4697-3837",
		href: "tel:+821046973837",
		color: "text-green-500",
		bg: "bg-green-50",
	},
	{
		icon: Github,
		label: "GitHub",
		value: "github.com/HiGeuni",
		href: "https://github.com/HiGeuni",
		color: "text-gray-900",
		bg: "bg-gray-50",
	},
];
</script>

<section id="contact" class="py-24 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
      <!-- Contact Info -->
      <div>
        <Reveal>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let's Connect</h2>
          <p class="text-gray-600 text-lg mb-12 leading-relaxed">
            I'm currently available for freelance work or full-time positions. 
            If you have a project that needs some creative touch, or just want to say hi, feel free to drop me a message.
          </p>
        </Reveal>

        <div class="space-y-6">
          {#each contactInfo as info, i}
            <Reveal delay={i * 0.1}>
              <a 
                href={info.href}
                target="_blank"
                class="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group"
              >
                <div class={`w-14 h-14 ${info.bg} ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <svelte:component this={info.icon} size={24} />
                </div>
                <div>
                  <div class="text-sm text-gray-500 font-medium mb-1">{info.label}</div>
                  <div class="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">{info.value}</div>
                </div>
                <div class="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-green-500">
                  <ArrowRight size={20} />
                </div>
              </a>
            </Reveal>
          {/each}
        </div>
      </div>

      <!-- Contact Form -->
      <Reveal delay={0.3}>
        <div class="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-8 relative z-10">Send a Message</h3>
          
          <form on:submit={handleSubmit} class="space-y-6 relative z-10">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="name" class="text-sm font-medium text-gray-700 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-gray-700 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label for="subject" class="text-sm font-medium text-gray-700 ml-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                required
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                placeholder="Project Inquiry"
              />
            </div>
            
            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-gray-700 ml-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                required
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={formState === 'submitting' || formState === 'success'}
              class={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                formState === 'success' 
                  ? 'bg-green-500' 
                  : 'bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl shadow-gray-900/20'
              }`}
            >
              {#if formState === 'idle'}
                <span>Send Message</span>
                <Send size={18} />
              {:else if formState === 'submitting'}
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending...</span>
              {:else if formState === 'success'}
                <span>Message Sent!</span>
                <Check size={18} />
              {/if}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  </div>
</section>
