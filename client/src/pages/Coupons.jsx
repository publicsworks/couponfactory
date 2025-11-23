import React from 'react';
import Layout from '../components/Layout';

const Coupons = () => {
    const brands = [
        { name: 'Amazon', logo: '/logos/amazon.png' },
        { name: 'Flipkart', logo: '/logos/flipkart.png' },
        { name: 'Myntra', logo: '/logos/myntra.png' },
        { name: 'Ajio', logo: '/logos/ajio.png' },
        { name: 'Dominos', logo: '/logos/dominos.png' },
        { name: 'Swiggy', logo: '/logos/swiggy.png' },
        { name: 'Zomato', logo: '/logos/zomato.png' },
        { name: 'Uber', logo: '/logos/uber.png' },
        { name: 'Nykaa', logo: '/logos/nykaa.png' },
        { name: 'Puma', logo: '/logos/puma.png' },
        { name: 'Adidas', logo: '/logos/adidas.png' },
        { name: 'Nike', logo: '/logos/nike.png' },
    ];

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center pt-10">

                {/* Slider Section */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                    <div className="flex gap-4 px-4 min-w-max">
                        {brands.map((brand, index) => (
                            <div key={index} className="w-32 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
                                <img
                                    src={brand.logo}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-sm font-bold text-gray-400">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text Section */}
                <div className="text-center mt-12 px-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Offers Available Soon</h2>
                    <p className="text-sm text-slate-500 font-medium">This website is now in developing mode.</p>
                </div>

            </div>
        </Layout>
    );
};

export default Coupons;
