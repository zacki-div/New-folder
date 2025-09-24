import { FaStar, FaRegStar, FaClock, FaPizzaSlice } from "react-icons/fa";
import AppInstall from "../AppInstall";
import Button from '../Button';
import logo from "/logo.svg"
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <section className="py-12 lg:py-15 bg-transparent">
            <div className="lg:max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">

                <div className="lg:w-1/2 w-full space-y-6" data-aos="fade-right">
                    <AppInstall/>
                    <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                        <span className="text-orange-600">Delicious</span> meals delivered to your door
                    </h1>

                    <p className="text-gray-600 max-w-lg">
                        Explore a wide selection of restaurants and dishes. Fast delivery, great prices, and a seamless ordering experience — right at your fingertips.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/menu">
                            <Button variant="solid" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg shadow-md">Order Now</Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="ghost" className="text-orange-600 px-4 py-2 hover:bg-gray-100">Contact</Button>
                        </Link>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full flex items-center justify-center relative" data-aos="fade-left">
                    <div className="relative group">
                        <span className="pointer-events-none absolute inset-0 -z-10 rounded-[50%] bg-gradient-to-tr from-orange-400/40 via-pink-400/30 to-yellow-300/30 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-soft-glow"></span>
                        <div className="w-72 h-72 md:w-96 md:h-96 bg-orange-50 rounded-[50%] flex items-center justify-center text-orange-600 text-[6rem] md:text-[8rem] shadow-xl group-hover:shadow-2xl transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[-6deg] animate-float">
                            <img src={logo} alt="logo" className="w-[80%]" />
                        </div>
                    </div>

                    <div className="absolute -bottom-6 md:bottom-5 right-20 bg-white border border-orange-100 rounded-full px-4 py-2 flex items-center gap-3 shadow" data-aos="zoom-in" data-aos-delay="150">
                        <FaClock className="text-orange-600 text-2xl" />
                        <div className="text-sm">
                            <div className="font-semibold">Super Fast</div>
                            <div className="text-gray-500">Delivery</div>
                        </div>
                    </div>

                    <div className="absolute top-6 left-8 bg-white border border-orange-100 rounded-full px-4 py-2 flex items-center gap-2 shadow" data-aos="zoom-in" data-aos-delay="250">
                        <div className="text-sm font-semibold">Good Rating</div>
                        <div className="flex text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </div>
                    </div>

                    <div className="absolute top-36 md:top-44 left-0 bg-white border border-orange-100 rounded-full px-6 py-3 flex flex-col items-center shadow" data-aos="zoom-in" data-aos-delay="350">
                        <div className="text-orange-600 font-bold text-lg">100+</div>
                        <div className="text-sm text-gray-600 font-semibold">Restaurants</div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;