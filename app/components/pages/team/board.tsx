import React from "react";

type BoardMember = {
  name: string;
  title: string;
  image: string;
  description: string;
};

const boardMembers: BoardMember[] = [
  {
    name: "Okan Ay",
    title: "Chairman of the Board",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Shapes our company's vision with over 20 years of industry experience.",
  },
  {
    name: "Elif Demir",
    title: "Vice Chairman of the Board",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Leads in strategic planning and innovation.",
  },
  {
    name: "Mehmet Kaya",
    title: "Independent Member",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    description: "Has international experience in finance and auditing.",
  },
  {
    name: "Zeynep Aksoy",
    title: "Member",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    description:
      "Actively participates in human resources and sustainability projects.",
  },
  {
    name: "Ali Rıza Şahin",
    title: "Member",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    description:
      "Specializes in operational excellence and digital transformation.",
  },
  {
    name: "Selin Yıldız",
    title: "Member",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    description:
      "Leads innovative projects in marketing and customer experience.",
  },
  {
    name: "Burak Erdem",
    title: "Member",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    description:
      "Provides leadership in information technology and innovation processes.",
  },
  {
    name: "Ayşe Korkmaz",
    title: "Member",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    description:
      "Actively involved in corporate communication and social responsibility projects.",
  },
];

const BoardMemberCard: React.FC<BoardMember> = ({
  name,
  title,
  image,
  description,
}) => (
  <div className="border-primary-700 focus-within:border-primary-700 hover:border-primary-800 flex h-full flex-col items-center border-b-4 bg-white p-8 transition">
    <div className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-200">
      <img src={image} alt={name} className="h-full w-full object-cover" />
    </div>
    <h3 className="mb-1 text-lg font-semibold text-gray-900">{name}</h3>
    <span className="text-primary-700 mb-2 text-sm font-medium">{title}</span>
    <p className="text-center text-xs text-gray-600">{description}</p>
  </div>
);

const BoardOfDirectorsSection: React.FC = () => (
  <section className="bg-gray-50 py-12 sm:py-20">
    <div className="container mx-auto max-w-7xl px-4">
      <h2 className="mb-10 text-center text-3xl font-bold text-gray-950 md:text-5xl">
        Our Board of Directors
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {boardMembers.map((member, idx) => (
          <BoardMemberCard key={idx} {...member} />
        ))}
      </div>
    </div>
  </section>
);

export default BoardOfDirectorsSection;
