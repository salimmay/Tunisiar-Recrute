import React from "react";

const AboutHeader = () => {
  const stats = [
    { name: "Offices worldwide", value: "12" },
    { name: "Full-time colleagues", value: "300+" },
    { name: "Hours per week", value: "40" },
  ];

  return (
    <div className="relative bg-gray-200 py-24 sm:py-32 overflow-hidden">
      {/* Semi-transparent white overlay */}
      <div className="absolute inset-0 bg-white opacity-70"></div>

      {/* Background image */}
      <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-red-500 mix-blend-multiply" />
                </div>
     
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Work with us</h2>
          <p className="mt-6 text-lg leading-8 text-white">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col items-center">
              <dt className="text-base leading-7 text-white">{stat.name}</dt>
              <dd className="mt-2 text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
