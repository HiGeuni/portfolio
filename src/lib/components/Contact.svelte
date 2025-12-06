<script lang="ts">
  import { Motion } from 'svelte-motion';
  import { inview } from 'svelte-inview';
  import emailjs from '@emailjs/browser';
  import {
    Mail,
    Phone,
    Send,
    Github,
    Linkedin,
    ArrowRight,
    Check,
    AlertCircle,
  } from 'lucide-svelte';
  import Reveal from './Reveal.svelte';

  let formState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    formState = 'submitting';
    const form = e.target as HTMLFormElement;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );
      formState = 'success';
      form.reset();
      setTimeout(() => {
        formState = 'idle';
      }, 5000);
    } catch (error) {
      console.error('FAILED...', error);
      formState = 'error';
      setTimeout(() => {
        formState = 'idle';
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'khyogeun_@naver.com',
      href: 'mailto:khyogeun_@naver.com',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+82 10-4697-3837',
      href: 'tel:+821046973837',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/HiGeuni',
      href: 'https://github.com/HiGeuni',
      color: 'text-gray-900',
      bg: 'bg-gray-50',
    },
  ];
</script>

<section id="contact" class="bg-gray-50 py-16 md:py-24">
  <div class="container mx-auto px-4 md:px-6">
    <div class="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-16">
      <!-- Contact Info -->
      <div>
        <Reveal>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl">Let's Connect</h2>
          <p class="mb-8 text-base leading-relaxed text-gray-600 md:mb-12 md:text-lg">
            I'm currently available for freelance work or full-time positions. If you have a project
            that needs some creative touch, or just want to say hi, feel free to drop me a message.
          </p>
        </Reveal>

        <div class="space-y-4 md:space-y-6">
          {#each contactInfo as info, i}
            <Reveal delay={i * 0.1}>
              <a
                href={info.href}
                target="_blank"
                class="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-green-200 hover:bg-green-50/30 hover:shadow-lg md:gap-6 md:p-6"
              >
                <div
                  class={`flex h-12 w-12 items-center justify-center rounded-xl ${info.bg} ${info.color} transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14`}
                >
                  <svelte:component this={info.icon} size={24} />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 text-xs font-medium text-gray-500 md:mb-1 md:text-sm">
                    {info.label}
                  </div>
                  <div
                    class="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-green-700 md:text-lg"
                  >
                    {info.value}
                  </div>
                </div>
                <div
                  class="ml-auto translate-x-[-10px] transform text-green-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <ArrowRight size={20} />
                </div>
              </a>
            </Reveal>
          {/each}
        </div>
      </div>

      <!-- Contact Form -->
      <Reveal delay={0.3}>
        <div
          class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:rounded-3xl md:p-10"
        >
          <div
            class="absolute top-0 right-0 z-0 -mt-16 -mr-16 h-32 w-32 rounded-bl-full bg-green-50"
          ></div>

          <h3 class="relative z-10 mb-6 text-xl font-bold text-gray-900 md:mb-8 md:text-2xl">
            Send a Message
          </h3>

          <form on:submit={handleSubmit} class="relative z-10 space-y-4 md:space-y-6">
            <div class="grid gap-4 md:grid-cols-2 md:gap-6">
              <div class="space-y-1.5 md:space-y-2">
                <label for="name" class="ml-1 text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="John Doe"
                />
              </div>
              <div class="space-y-1.5 md:space-y-2">
                <label for="email" class="ml-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div class="space-y-1.5 md:space-y-2">
              <label for="subject" class="ml-1 text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                name="title"
                required
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                placeholder="Project Inquiry"
              />
            </div>

            <div class="space-y-1.5 md:space-y-2">
              <label for="message" class="ml-1 text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formState === 'submitting' || formState === 'success'}
              class={`flex w-full transform items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] md:py-4 ${
                formState === 'success'
                  ? 'bg-green-500'
                  : formState === 'error'
                    ? 'bg-red-500'
                    : 'bg-gray-900 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl'
              }`}
            >
              {#if formState === 'idle'}
                <span>Send Message</span>
                <Send size={18} />
              {:else if formState === 'submitting'}
                <div
                  class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                ></div>
                <span>Sending...</span>
              {:else if formState === 'success'}
                <span>Message Sent!</span>
                <Check size={18} />
              {:else if formState === 'error'}
                <span>Failed to Send</span>
                <AlertCircle size={18} />
              {/if}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  </div>
</section>
