import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=800&fit=crop"
            alt="Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zawana-950/50" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Our Story</h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Crafting elegance, one dress at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zawana-600 mb-3">Since 2018</p>
              <h2 className="section-title mb-6">The Zawana Journey</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Zawana was born from a simple belief: every woman deserves to feel extraordinary in what she wears. Founded in a small atelier, our brand has grown into a celebration of feminine elegance and timeless design.
                </p>
                <p>
                  We source the finest fabrics from around the world — silk from Como, linen from Belgium, and lace from Calais — and work with skilled artisans who share our passion for impeccable craftsmanship.
                </p>
                <p>
                  Each dress is thoughtfully designed to flatter the female form, combining modern silhouettes with classic details that never go out of style.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=750&fit=crop"
                alt="Designer at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-zawana-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                desc: 'We never compromise on materials or construction. Every seam, every stitch is inspected to meet our exacting standards.',
              },
              {
                title: 'Sustainable Beauty',
                desc: 'We are committed to responsible production, using eco-conscious fabrics and minimizing waste in our ateliers.',
              },
              {
                title: 'Inclusive Elegance',
                desc: 'Beauty comes in every shape and size. Our dresses are designed to celebrate the diversity of women everywhere.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-zawana-100 flex items-center justify-center text-zawana-800 font-serif text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-serif text-zawana-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Find Your Perfect Dress?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Explore our latest collection and discover pieces that make you feel confident and beautiful.
          </p>
          <Link to="/shop" className="btn-primary">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
