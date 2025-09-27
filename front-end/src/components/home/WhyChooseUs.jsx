import React from 'react'
import { Clock, Award, Leaf, UtensilsCrossed } from 'lucide-react'
import AppInstall from '../AppInstall'
import Lottie from 'lottie-react'
import animationData from '../../assets/D897Nvg9xA (1).json'

function WhyChooseUs() {
    const features = [
        {
            icon: UtensilsCrossed,
            title: 'Cuisine de Qualité',
            description: 'Découvrez des saveurs exceptionnelles préparées avec des ingrédients premium et l\'expertise culinaire.'
        },
        {
            icon: Clock,
            title: 'Service Rapide',
            description: 'Préparation et livraison rapides sans compromettre la qualité et le goût.'
        },
        {
            icon: Leaf,
            title: 'Ingrédients Frais',
            description: 'Nous nous approvisionnons uniquement avec les ingrédients les plus frais et de saison pour un goût authentique.'
        },
        {
            icon: Award,
            title: 'Chefs Experts',
            description: 'Nos chefs expérimentés apportent passion et savoir-faire à chaque plat qu\'ils créent.'
        }
    ]

    return (
        <>
            <section className="py-10" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-center text-3xl lg:text-4xl font-bold font-serif mb-10" data-aos="fade-up">
                        Pourquoi Nous Choisir
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
                            <Lottie 
                                animationData={animationData}
                                className='w-[500px] h-[400px]'
                                loop={true}
                                autoplay={true}
                            />
                        </div>
                        <div className='lg:w-1/2 px-6 lg:px-0 flex flex-col space-y-3 lg:space-y-7 justify-center ' data-aos="fade-left">
                            <h1 className='text-4xl lg:text-6xl font-bold'>Profitez d'une Expérience de <span className='text-red-500'>Commande</span> Fluide</h1>
                            <p>De la livraison rapide à une large sélection de cuisines, notre service de commande de nourriture a tout ce dont vous avez besoin pour satisfaire vos envies.</p>
                            <AppInstall/>
                        </div>
                    </div>
                </section>
        </>
    )
}

export default WhyChooseUs