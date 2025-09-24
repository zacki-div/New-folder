import React from 'react'
import { Clock, Award, Leaf, UtensilsCrossed } from 'lucide-react'
import AppInstall from '../AppInstall'
import reactLogo from '../../assets/react.svg'

function WhyChooseUs() {
    const features = [
        {
            icon: UtensilsCrossed,
            title: 'Quality Cuisine',
            description: 'Experience exceptional flavors crafted with premium ingredients and culinary expertise.'
        },
        {
            icon: Clock,
            title: 'Fast Service',
            description: 'Quick preparation and delivery without compromising on quality and taste.'
        },
        {
            icon: Leaf,
            title: 'Fresh Ingredients',
            description: 'We source only the freshest, seasonal ingredients for authentic taste.'
        },
        {
            icon: Award,
            title: 'Expert Chefs',
            description: 'Our experienced chefs bring passion and skill to every dish they create.'
        }
    ]

    return (
        <>
            <section className="py-10" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10" data-aos="fade-up">
                        Why Choose Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all duration-300">
                                        <Icon className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">{feature.description}</p>
                                    <div className="w-0 h-0.5 bg-orange-500 group-hover:w-1/2 transition-all duration-300 mt-4"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
                <section className='py-20' id='about' data-aos="fade-up">
                    <div className='flex flex-col lg:flex-row mx-auto max-w-7xl'>
                        <div className='lg:w-1/2 flex items-center justify-center' data-aos="fade-right">
                            <img src={reactLogo} alt="Chef cooking illustration" className='w-[500px]' />
                        </div>
                        <div className='lg:w-1/2 px-6 lg:px-0 flex flex-col space-y-3 lg:space-y-7 justify-center ' data-aos="fade-left">
                            <h2 className='text-red-600 font-semibold text-lg lg:text-xl'>KEY FEATURES</h2>
                            <h1 className='text-4xl lg:text-6xl font-bold'>Enjoy a Seamless <span className='text-red-500'>Ordering</span> Experience</h1>
                            <p>From fast delivery to a wide selection of cuisines, our food ordering service has everything you need to satisfy your cravings.</p>
                            <AppInstall/>
                        </div>
                    </div>
                </section>
        </>
    )
}

export default WhyChooseUs