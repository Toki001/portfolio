import { Icon } from './Icon';
import React, { useState } from 'react';
import { siteConfig } from '../../config/site';

export function Contact() {
  const { contact } = siteConfig;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    if (contact.form.mode === 'mailto') {
      const subject = encodeURIComponent(`${contact.form.subjectPrefix}: ${formData.subject}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Brief:\n${formData.message}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      
      // Simulate success state for mailto
      setTimeout(() => setFormStatus('success'), 1000);
      return;
    }

    if (contact.form.mode === 'endpoint' && contact.form.endpoint) {
      try {
        const response = await fetch(contact.form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormStatus('success');
        } else {
          setFormStatus('error');
        }
      } catch {
        setFormStatus('error');
      }
    }
  };

  return (
    <section className="mb-16 scroll-mt-24" id="contact">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="text-outline text-[15px]" name="alternate_email" />
          <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ contact ]</span>
          <span className="font-code-snippet text-xs text-secondary font-bold font-mono">06 // GET IN TOUCH</span>
        </div>
        <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary tracking-tight mb-2">
          {contact.heading}
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
          {contact.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Deep Evergreen Card */}
        <div className="lg:col-span-5 bg-[#00241d] text-[#ffffff] rounded-[24px] p-6 md:p-8 dark-hero-elevation border border-[rgba(255,253,248,0.1)] h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Icon className="text-[15px] text-[#81a499]" name="hub" />
                <span className="font-code-snippet text-xs text-[#81a499] font-mono tracking-wider">[ DIRECT CHANNELS ]</span>
              </div>
            </div>
            <h3 className="text-headline-md font-headline-md font-semibold text-[#ffffff] mb-3">
              Reach Out Directly
            </h3>
            <p className="text-body-sm font-body-sm text-[#81a499] mb-8 leading-relaxed">
              {contact.directIntro}
            </p>
            
            <div className="space-y-3">
              <a className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-secondary-fixed hover:bg-white/10 transition-colors" href={`mailto:${contact.email}`}>
                <div className="flex items-center gap-3">
                  <Icon className="text-secondary-container text-[20px]" name="mail" />
                  <span className="text-xs font-code-snippet text-[#ffffff]">{contact.email}</span>
                </div>
                <span className="text-xs font-mono text-secondary-fixed">↗</span>
              </a>
              {Object.values(siteConfig.socials).map((social) => {
                if (!social.url || social.label === 'Discord') return null;
                let iconName = 'code';
                if (social.label === 'LinkedIn') iconName = 'share';
                if (social.label === 'Facebook') iconName = 'group';

                return (
                  <a key={social.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-secondary-fixed hover:bg-white/10 transition-colors" href={social.url} rel="noopener noreferrer" target="_blank">
                    <div className="flex items-center gap-3">
                      <Icon className="text-secondary-container text-[20px]" name={iconName} />
                      <span className="text-xs font-code-snippet text-[#ffffff]">{social.handle}</span>
                    </div>
                    <span className="text-xs font-mono text-secondary-fixed">↗</span>
                  </a>
                );
              })}
              {siteConfig.socials.discord.handle && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Icon className="text-secondary-container text-[20px]" name="chat" />
                    <span className="text-xs font-code-snippet text-[#81a499]">Discord: {siteConfig.socials.discord.handle}</span>
                  </div>
                  <span className="text-xs font-code-snippet text-[#81a499] font-mono">HANDLE</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#c1c8c4] editorial-card-shadow h-full">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c1c8c4]/60">
            <div className="flex items-center gap-1.5">
              <Icon className="text-[15px] text-outline" name="edit_note" />
              <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ SEND A BRIEF ]</span>
            </div>
            <span className="font-code-snippet text-xs text-secondary font-mono">INPUT CHANNELS</span>
          </div>
          
          <h3 className="text-headline-md font-headline-md text-primary mb-2">Project Inquiries & Collaboration</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant mb-6">
            Fill out your product ideas, scope requirements, or direct inquiry below.
          </p>

          {formStatus === 'success' ? (
            <div className="bg-[#e5e2da] border border-[#81a499] text-primary p-4 rounded-lg flex flex-col items-center justify-center text-center py-10" aria-live="polite">
              <Icon className="text-[32px] text-secondary mb-3" name="check_circle" />
              <h4 className="font-headline-sm font-semibold mb-1">Message Prepared Successfully</h4>
              <p className="text-body-sm text-on-surface-variant mb-6">Your draft has been created or message has been sent.</p>
              <button 
                onClick={() => { setFormStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                className="px-4 py-2 bg-[#ffffff] text-primary border border-[#c1c8c4] rounded-lg text-xs font-label-md font-semibold shadow-sm hover:bg-surface-container transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} aria-live="polite">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-code-snippet text-xs text-primary mb-1 font-mono" htmlFor="name">[ 01 ] YOUR NAME</label>
                  <input className="w-full bg-[#ffffff] border border-[#c1c8c4] text-primary placeholder-[#717976] rounded-lg p-3 text-body-sm focus:border-secondary focus:ring-0 outline-none transition-colors" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required type="text" disabled={formStatus === 'sending'} />
                </div>
                <div>
                  <label className="block font-code-snippet text-xs text-primary mb-1 font-mono" htmlFor="email">[ 02 ] EMAIL ADDRESS</label>
                  <input className="w-full bg-[#ffffff] border border-[#c1c8c4] text-primary placeholder-[#717976] rounded-lg p-3 text-body-sm focus:border-secondary focus:ring-0 outline-none transition-colors" id="email" value={formData.email} onChange={handleChange} placeholder="john@domain.com" required type="email" disabled={formStatus === 'sending'} />
                </div>
              </div>
              <div>
                <label className="block font-code-snippet text-xs text-primary mb-1 font-mono" htmlFor="subject">[ 03 ] TOPIC / PROJECT TYPE</label>
                <input className="w-full bg-[#ffffff] border border-[#c1c8c4] text-primary placeholder-[#717976] rounded-lg p-3 text-body-sm focus:border-secondary focus:ring-0 outline-none transition-colors" id="subject" value={formData.subject} onChange={handleChange} placeholder="Mobile App Development / Web Platform" required type="text" disabled={formStatus === 'sending'} />
              </div>
              <div>
                <label className="block font-code-snippet text-xs text-primary mb-1 font-mono" htmlFor="message">[ 04 ] PROJECT BRIEF</label>
                <textarea className="w-full bg-[#ffffff] border border-[#c1c8c4] text-primary placeholder-[#717976] rounded-lg p-3 text-body-sm focus:border-secondary focus:ring-0 outline-none transition-colors resize-none" id="message" value={formData.message} onChange={handleChange} placeholder="Describe the problem, target platform, technical parameters, and target timeline..." required rows={5} disabled={formStatus === 'sending'}></textarea>
              </div>
              
              {formStatus === 'error' && (
                <div className="text-error text-xs font-code-snippet font-medium">Failed to send message. Please try again.</div>
              )}
              
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-outline font-code-snippet">[ RESPONSE: {contact.responseTime} ]</span>
                <button 
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[#ffffff] text-label-md font-label-md font-medium transition-all duration-150 shadow-sm font-code-snippet ${formStatus === 'sending' ? 'bg-[#717976] cursor-not-allowed' : 'bg-primary hover:bg-secondary active:scale-[0.98]'}`} 
                  type="submit"
                  disabled={formStatus === 'sending'}
                >
                  <span>{formStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                  {formStatus !== 'sending' && <span className="text-secondary-fixed text-base font-semibold">↗</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
