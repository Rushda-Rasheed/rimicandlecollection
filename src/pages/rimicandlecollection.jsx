
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const products = [
  { id: 1, name: "Daisy Flower Candle", fragrance: "Peach", price: 150, image: "/images/flower.jpeg", extraImages: ["/images/flower2.jpeg", "/images/flower3.jpeg"] },
  { id: 2, name: "Trinclay Jar Candle", fragrance: "Cedarwood", price: 450, image: "/images/jar.jpeg", extraImages: ["/images/jar2.jpeg", "/images/jar3.jpeg"] },
  { id: 3, name: "Lavender Bliss Candle", fragrance: "Lavender", price: 750, image: "/images/lo.jpeg", extraImages: ["/images/lo2.jpeg", "/images/lo3.jpeg"] },
  { id: 4, name: "Secret Message Candle", fragrance: "Rose", price: 450, image: "/images/message.jpeg", extraImages: ["/images/message2.jpeg", "/images/message3.jpeg"] },
  { id: 5, name: "Duck Candle", fragrance: "Vanilla", price: 259, image: "/images/duck.jpeg", extraImages: ["/images/duck2.jpeg", "/images/duck3.jpeg"] },
  { id: 6, name: "Four Bubble Candles", fragrance: "Musk", price: 105, image: "/images/four.jpeg", extraImages: ["/images/four2.jpeg", "/images/four3.jpeg"] },
  { id: 7, name: "Water fire Candle", fragrance: "Cherry", price: 750, image: "/images/mg.jpeg", extraImages: ["/images/mg2.jpeg", "/images/mg3.jpeg"] },
  { id: 8, name: "Mini Candle(6 packset)", fragrance: "Sandalwood", price: 250, image: "/images/mini.jpeg", extraImages: ["/images/mini2.jpeg", "/images/mini3.jpeg"] },
  { id: 9, name: "Six Bubblet Set", fragrance: "Mixed", price: 299, image: "/images/six.jpeg", extraImages: ["/images/six2.jpeg", "/images/six3.jpeg"] },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [imageIndexes, setImageIndexes] = useState({});
  const hoverRefs = useRef({});
  const intervalRef = useRef(null);
  const backgroundImages = [
    "/images/bg.png", "/images/jar.jpeg", "/images/six.jpeg","/images/message2.jpeg","/images/six2.jpeg"
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem("luxecart");
    if (storedCart) setCart(JSON.parse(storedCart));

    const bgInterval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem("luxecart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes(prev =>
        products.reduce((acc, product) => {
          const allImages = [product.image, ...product.extraImages];
          const currentIndex = prev[product.id] || 0;
          acc[product.id] = (currentIndex + 1) % allImages.length;
          return acc;
        }, {})
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast("This item is already in your cart!", { icon: "ℹ️" });
    } else {
      setCart((prev) => [...prev, { ...product, quantity }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    const message =
      "Hello! I want to order:\n" +
      cart.map((item) => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join("\n");
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923004129670?text=${encoded}`, "_blank");
  };

  const getTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const rotateImages = () => {
    setImageIndexes(prev =>
      products.reduce((acc, product) => {
        const allImages = [product.image, ...product.extraImages];
        const currentIndex = prev[product.id] || 0;
        acc[product.id] = (currentIndex + 1) % allImages.length;
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    startCarousel();
    return () => stopCarousel();
  }, []);

  const startCarousel = () => {
    stopCarousel();
    intervalRef.current = setInterval(() => {
      const anyHovered = Object.values(hoverRefs.current).some(v => v);
      if (!anyHovered) rotateImages();
    }, 5000);
  };

  const stopCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseEnter = (productId) => {
    hoverRefs.current[productId] = true;
  };

  const handleMouseLeave = (productId) => {
    hoverRefs.current[productId] = false;
  };

  return (
    <div className="font-serif bg-white text-gray-900 scroll-smooth">
      {/* Header */}
      <header className="bg-white shadow fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/images/mylogo.jpeg" alt="Logo" width={40} height={40} className="rounded-full" priority />
            <div className="text-xl font-extrabold tracking-widest text-pink-500">Rimi’s Collection</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="space-x-6 hidden md:block text-sm uppercase font-medium">
            <a href="#home" className="hover:text-pink-500">Home</a>
            <a href="#shop" className="hover:text-pink-500">Shop</a>
            <a href="#cart" className="hover:text-pink-500">🛒MyCart</a>
            <a href="#about" className="hover:text-pink-500">About</a>
            <a href="#contact" className="hover:text-pink-500">Contact</a>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            {menuOpen ? (
              <IoMdClose size={28} onClick={() => setMenuOpen(false)} className="cursor-pointer" />
            ) : (
              <HiOutlineMenuAlt3 size={28} onClick={() => setMenuOpen(true)} className="cursor-pointer" />
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t text-center py-4 space-y-3">
            <a href="#home" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-pink-500">Home</a>
            <a href="#shop" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-pink-500">Shop</a>
            <a href="#cart" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-pink-500">🛒MYCart</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-pink-500">About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-pink-500">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center px-4 sm:px-8"
        style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Light Up Every Moment</h1>
          <p className="text-base sm:text-lg mb-6">Handmade luxury candles, crafted with love and clean ingredients 🕯️</p>
          
                  <button
          onClick={() => window.location.href = "#shop"}
          className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-600"
        >
          Shop Now
        </button>
        </div>
      </section>

      {/* Shop Section */}
      
<section id="shop" className="py-20 bg-[#fdfaf6]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-12">Shop Our Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => {
              const images = [product.image, ...product.extraImages];
              const index = imageIndexes[product.id] || 0;
              return (
                <div
                  key={product.id}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => handleMouseLeave(product.id)}
                  className="bg-white rounded-2xl shadow-lg p-5 text-center relative"
                >
                  <div className="relative">
                    <Image
                      src={images[index]}
                      alt={product.name}
                      width={400}
                      height={200}
                      className="rounded-xl mx-auto transition duration-700 ease-in-out"
                    />
                   
                    <div className="flex justify-center gap-1 mt-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIndexes(prev => ({ ...prev, [product.id]: i }))}
                          className={`w-2 h-2 rounded-full ${index === i ? 'bg-pink-500' : 'bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.fragrance} Fragrance</p>
                  <p className="text-pink-500 font-bold mt-2">Rs. {product.price}</p>
                  <div className="mt-2">
                    <label htmlFor={`qty-${product.id}`} className="mr-2">Qty:</label>
                    <select
                      id={`qty-${product.id}`}
                      value={quantities[product.id] || 1}
                      onChange={(e) => setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })}
                      className="border px-2 py-1 rounded"
                    >
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((qty) => (
                        <option key={qty} value={qty}>{qty}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full transition"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Cart Section */}
            <section  id="cart"className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">🛒 My Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty. Time to treat yourself ✨</p>
          ) : (
            <>
              <ul className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="bg-[#fdfaf6] p-4 rounded-xl flex justify-between items-center shadow-md"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500">{item.fragrance} Fragrance</p>
                      <p className="text-pink-500 font-bold">Rs. {item.price} x {item.quantity} = Rs. {item.price * item.quantity}</p>
                      
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-xl font-semibold">Total: Rs. {getTotal()}</p>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 rounded-xl mt-6 transition"
                >
                  Place Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-b from-pink-50 to-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-pink-600 mb-6 relative inline-block">
            Why LuxeCandle?
            <span className="block h-1 w-16 bg-pink-400 mx-auto mt-2 rounded"></span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            At <span className="font-semibold text-pink-500">Rimi’s Collection</span>, each candle is lovingly hand-poured using
            <span className="italic text-pink-600"> premium soy wax</span>, eco-friendly wicks, and rich, long-lasting fragrances.
            <br />
            <span className="mt-4 inline-block">Light one up and elevate your space with elegance and calm.</span>
          </p>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h2 className="text-4xl font-extrabold text-white mb-12 tracking-wide">
      Get in Touch
    </h2>

    <div className="flex justify-center gap-12 flex-wrap">
      {/* WhatsApp */}
      <a
        href="https://wa.me/923004129670"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-green-400 hover:text-green-500 transition duration-300 group"
      >
        <FaWhatsapp size={40} className="mb-2 group-hover:scale-110 group-hover:drop-shadow-lg transition" />
        <span className="text-lg font-medium">WhatsApp</span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/rimis_collection?igsh=OXp6cTJnYjFybm1q"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-pink-400 hover:text-pink-500 transition duration-300 group"
      >
        <FaInstagram size={40} className="mb-2 group-hover:scale-110 group-hover:drop-shadow-lg transition" />
        <span className="text-lg font-medium">Instagram</span>
      </a>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-6 text-sm text-gray-600">
         <div className="flex justify-center space-x-4 mb-2">
           <a href="https://wa.me/923004129670" target="_blank" rel="noopener noreferrer">           <FaWhatsapp className="text-green-500 hover:text-green-700" size={20} />
           </a>
           <a href="https://www.instagram.com/rimis_collection?igsh=OXp6cTJnYjFybm1q" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 hover:text-pink-700" size={20} />
          </a>
       </div>
       <p>© {new Date().getFullYear()} Rimi’s Collection. All rights reserved.</p>
       </footer>
    </div>
  );
}


