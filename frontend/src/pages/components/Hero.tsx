

const Hero = () => {
    return (
        <>
            <div>
                <section className="h-dvh w-dvw max-h-[80rem] relative">
                    <div className="absolute inset-0 z-[1]">
                        <img
                            className="h-full w-full object-cover object-center"
                            src="https://github.com/Gederooney/modern-gym-landing/blob/master/bg.png?raw=true"
                            alt=""
                        />
                    </div>
                    <div className="max-w-[120rem] mx-auto h-full relative z-[2] px-6 md:px-8 lg:px-10">
                        <div className="h-full w-full  flex flex-col relative space-y-6">
                            <div className="mt-auto mb-0 text-gray-50 md:pb-36 space-y-6">
                                <span className="font-light text-sm text-accent-500 ">
                                    Fitness World
                                </span>
                                <h1 className="text-3xl md:text-5xl max-w-[30rem] font-medium">
                                "Where sweat meets SUCCESS"
                                </h1>
                                <p className="max-w-[30rem] font-light ml-4 before:content-[''] relative before:absolute before:w-px before:h-full before:left-0 before:top-0 before:-translate-x-4 before:bg-accent-500 md:text-base text-sm text-justify">
                                Fitness is not just about working out; it's about embracing a lifestyle that fosters strength, resilience, and overall well-being. At our gym, we provide the space, support, and community you need to challenge yourself and achieve your goals. From intense training sessions to mindful recovery, every step is designed to push you forward and build not just a better body, but a better you. Start your journey today and discover the power within.
                                </p>
                                <div className="md:flex-row flex-col flex gap-4">
                                    <button className="inline-block text-base font-medium px-12 py-2 bg-accent-400 rounded-lg cursor-pointer">
                                        Join Now
                                    </button>
                                    <button className="inline-block text-base font-medium px-12 py-2 border border-accent-400 rounded-lg text-accent-400 cursor-pointer bg-gray-50/10 backdrop-blur-3xl">
                                        visit us
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Hero;
