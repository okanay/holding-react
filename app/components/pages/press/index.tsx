import React from "react";
import { Calendar, TvMinimal } from "lucide-react";
import { BreadcrumbItem, HeroSection } from "@/components/ui/hero";

// Breadcrumb data
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Press", href: "/press" },
  { label: "Koç Holding Announces Strategic Partnership" },
];

// Meta info
const meta = {
  date: "April 26, 2025",
  author: "OkanTürk",
};

export const RootPressExamplePage: React.FC = () => (
  <main>
    {/* Hero & Breadcrumb */}
    <HeroSection
      image="https://assets.hoi.com.tr/dummy_ui_image_lg.jpg"
      title="Koç Holding Announces Strategic Partnership with GlobalTech"
      subtitle="Press Release"
      breadcrumbItems={breadcrumbItems}
    />

    {/* News Content Section */}
    <section className="bg-gray-50 py-12 sm:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Meta Info */}
        <div className="mb-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center text-sm text-gray-500">
            <Calendar className="text-primary-700 mr-1 inline-block size-4" />
            {meta.date}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <TvMinimal className="text-primary-700 mr-1 inline-block size-4" />
            By{" "}
            <span className="text-primary-700 ml-1 font-medium">
              {meta.author}
            </span>
          </span>
        </div>

        {/* Main Article */}
        <article className="prose">
          <h1>
            Koç Holding and GlobalTech Announce Strategic Alliance for Digital
            Transformation
          </h1>
          <p>
            <strong>Istanbul, April 26, 2025</strong> – Koç Holding, Turkey’s
            leading investment holding company, today announced a strategic
            alliance with{" "}
            <a
              href="https://globaltech.example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GlobalTech
            </a>
            , a global leader in technology solutions. This partnership aims to
            accelerate digital transformation and foster innovation across key
            industries.
          </p>

          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
            alt="Koç Holding and GlobalTech Partnership"
            className="my-4"
          />

          <h2>Key Highlights</h2>
          <ul>
            <li>
              <strong>Innovation Lab:</strong> Establishment of a joint R&amp;D
              center in Istanbul.
            </li>
            <li>
              <strong>Talent Exchange:</strong> Launch of cross-company talent
              development programs.
            </li>
            <li>
              <strong>Market Expansion:</strong> Expansion into new markets
              across Europe and the Middle East.
            </li>
            <li>
              <strong>Sustainability:</strong> Commitment to green technology
              and social responsibility.
            </li>
          </ul>

          <h2>Executive Statements</h2>
          <blockquote>
            “This partnership marks a significant milestone in our digital
            journey. Together with GlobalTech, we are committed to delivering
            innovative solutions that will shape the future of our industries.”
            <br />
            <span
              className="mt-2 block font-semibold"
              style={{ color: "rgb(var(--primary-700))" }}
            >
              Ahmet Yılmaz, Chairman of the Board, Koç Holding
            </span>
          </blockquote>

          <h3>Why This Matters</h3>
          <p>
            <em>Digital transformation</em> is no longer a luxury but a
            necessity. By combining the strengths of both organizations, this
            alliance will:
          </p>
          <ol>
            <li>Accelerate the adoption of cutting-edge technologies.</li>
            <li>Enhance operational efficiency and customer experience.</li>
            <li>Drive sustainable growth and value creation.</li>
          </ol>

          <h2>Impact Table</h2>
          <table>
            <thead>
              <tr>
                <th>Initiative</th>
                <th>Expected Impact</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Innovation Lab</td>
                <td>10+ new digital products</td>
                <td>2025-2027</td>
              </tr>
              <tr>
                <td>Talent Exchange</td>
                <td>100+ employees upskilled</td>
                <td>2025-2026</td>
              </tr>
              <tr>
                <td>Green Tech</td>
                <td>30% reduction in carbon footprint</td>
                <td>2026-2028</td>
              </tr>
            </tbody>
          </table>

          <h2>Did You Know?</h2>
          <blockquote>
            Koç Holding is the only Turkish company listed in the Fortune Global
            500, with a legacy of nearly a century in innovation and leadership.
          </blockquote>

          <hr />

          <h2>Contact &amp; Resources</h2>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:press@koc.com.tr">press@koc.com.tr</a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+902165310000">+90 216 531 00 00</a>
            </li>
            <li>
              <strong>More Info:</strong>{" "}
              <a
                href="https://www.koc.com.tr/en-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Koç Holding Official Website
              </a>
            </li>
          </ul>

          <h3>About Koç Holding</h3>
          <p>
            <strong>Koç Holding</strong> is Turkey’s largest industrial and
            services group in terms of revenues, exports, and market
            capitalization. With a legacy of nearly a century, Koç Holding
            continues to lead the way in innovation, sustainability, and
            corporate governance.
          </p>

          <h3>About GlobalTech</h3>
          <p>
            <strong>GlobalTech</strong> is a global leader in technology
            solutions, specializing in digital transformation, cloud computing,
            and artificial intelligence. The company serves clients across more
            than 30 countries.
          </p>
        </article>
      </div>
    </section>
  </main>
);
