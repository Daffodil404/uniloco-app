'use client';

import Header from '@/components/ui/Header';

export default function TokenEconomicPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="web3 hub" navItems={['home', 'how-to', 'web3 hub', 'partnership']} />

      <main className="pt-20">
        <section className="py-24 bg-gradient-to-b from-black via-[#1a0f0f] to-black text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Token Economic</h1>
            <p className="text-white/80 mb-10">Overview coming soon</p>
            <div className="mx-auto max-w-xl bg-white/10 border border-white/20 rounded-2xl p-8">
              <p className="text-sm text-white/80">
                We are designing a sustainable token economy to power travel creation, participation, and rewards.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


