import { FC, useCallback, useState } from "react";

type ExpandableSection = "description" | "shipping" | "reviews" | null;

export const Description: FC = () => {
  const [expandedSection, setExpandedSection] =
    useState<ExpandableSection>(null);

  const toggleSection = useCallback((section: ExpandableSection) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  return (
    <>
      <div className="mt-8 divide-y divide-gray-200">
        <div className="py-4">
          <button
            onClick={() => toggleSection("description")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => toggleSection("description"))
            }
            className="flex justify-between items-center w-full text-left focus:outline-none"
            aria-expanded={expandedSection === "description"}
            aria-controls="description-content"
          >
            <h3 className="text-sm font-semibold text-gray-900">Description</h3>
            <svg
              className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                expandedSection === "description" ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {expandedSection === "description" && (
            <div
              id="description-content"
              className="mt-2 text-sm text-gray-600 transition-all duration-200"
            >
              <p className="mb-4">
                Our premium comfort sneakers are designed with your feet in
                mind. The advanced cushioning system absorbs impact while the
                breathable mesh upper keeps your feet cool and comfortable all
                day long. The durable rubber outsole provides excellent traction
                on any surface.
              </p>
              <p>
                The ergonomic design supports natural foot movement, reducing
                fatigue during extended wear. Perfect for both casual outings
                and active lifestyles.
              </p>
            </div>
          )}
        </div>

        <div className="py-4">
          <button
            onClick={() => toggleSection("shipping")}
            onKeyDown={(e) => handleKeyDown(e, () => toggleSection("shipping"))}
            className="flex justify-between items-center w-full text-left focus:outline-none"
            aria-expanded={expandedSection === "shipping"}
            aria-controls="shipping-content"
          >
            <h3 className="text-sm font-semibold text-gray-900">
              Shipping & Returns
            </h3>
            <svg
              className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                expandedSection === "shipping" ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {expandedSection === "shipping" && (
            <div
              id="shipping-content"
              className="mt-2 text-sm text-gray-600 transition-all duration-200"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Shipping Options</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Free standard shipping: 3-5 business days</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Express shipping: 2-3 business days ($9.99)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Overnight shipping: 1 business day ($19.99)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Returns Policy</h4>
                  <p className="mt-2">
                    Easy 30-day returns for unused items in original condition
                    with tags attached. Return shipping is free for domestic
                    orders.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
