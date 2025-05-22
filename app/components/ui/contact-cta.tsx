import { Link } from "@/i18n/link";
import React from "react";

const ContactCTASection: React.FC = () => (
  <section className="from-primary-600 via-primary-700 to-primary-600 bg-gradient-to-r py-12">
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-white drop-shadow">
            Get in Touch With Us
          </h2>
          <p className="text-lg text-gray-100">
            Our team is ready to assist you with your questions or collaboration
            proposals.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="text-primary-700 flex min-w-[180px] items-center justify-center bg-white px-8 py-4 font-semibold shadow transition hover:opacity-80 hover:shadow-md"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ContactCTASection;
