
const BMICalculator = () => {
    return (
        <>

            <div className="flex  w-full justify-center *:first-letter:flex-col md:flex-row items-center max-w-4xl mx-auto bg-gray-400 rounded-lg shadow-lg overflow-hidden mb-5">
                <div className="p-8 w-full md:w-1/2 ">
                    <h2 className="text-2xl font-bold text-red-600 mb-4 tracking-widest">CALCULATE YOUR</h2>
                    <h3 className="text-xl font-semibold text-gray-700 mb-8 ">BODY MASS INDEX</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-black block">HEIGHT</label>
                            <input
                                type="number"
                                placeholder="Cm"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-black block">WEIGHT</label>
                            <input
                                type="number"
                                placeholder="Kg"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-black block">AGE</label>
                            <input
                                type="number"
                                placeholder="Year"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-black block">GENDER</label>
                            <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition duration-300">
                        CALCULATE BMI →
                    </button>
                </div>
            </div>


        </>

    )
}

export default BMICalculator