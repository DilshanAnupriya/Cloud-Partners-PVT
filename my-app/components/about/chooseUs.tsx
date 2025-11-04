import React from 'react';
import type { ReactNode } from 'react';
import { Users, Target, RefreshCw, Award } from 'lucide-react';

/**
 * Accent color tokens used to render accessible icon badges and subtle glows.
 */
export type AccentColor = 'blue' | 'yellow' | 'red' | 'green' | 'gray';

/**
 * Feature item shown in the grid.
 */
export interface FeatureItem {
  /** Decorative icon to represent the feature. */
  icon: ReactNode;
  /** Short, descriptive title of the feature. */
  title: string;
  /** Supporting description for the feature. */
  description: string;
  /** Accent color used for the icon badge and hover glow. */
  accent?: AccentColor;
}

/**
 * Props for the ChooseUs component.
 *
 * Style-related props:
 * - `className`: Apply additional classes to the outer section container
 * - `cardClassName`: Apply additional classes to each feature card
 * - `rounded`: Control card corner rounding (`lg`, `xl`, `2xl`)
 * - `showAccentGlow`: Toggle subtle accent glow on hover
 */
export interface ChooseUsProps {
  /** Section heading text. */
  title?: string;
  /** Section subheading text. */
  subtitle?: string;
  /** Feature items to display; defaults provided if omitted. */
  features?: FeatureItem[];
  /** Additional classes for the outer container. */
  className?: string;
  /** Additional classes for each feature card. */
  cardClassName?: string;
  /** Card corner rounding size. */
  rounded?: 'lg' | 'xl' | '2xl';
  /** Enable accent glow overlays on hover for feature cards. */
  showAccentGlow?: boolean;
  /** Optional aria-label for the section for assistive tech. */
  ariaLabel?: string;
}

const ACCENT_STYLES: Record<AccentColor, { badgeBg: string; badgeText: string; ring: string; glowFrom: string; glowTo: string }> = {
  blue: { badgeBg: 'bg-blue-50', badgeText: 'text-blue-700', ring: 'ring-blue-200', glowFrom: 'from-blue-500/10', glowTo: 'to-blue-600/10' },
  yellow: { badgeBg: 'bg-yellow-50', badgeText: 'text-yellow-700', ring: 'ring-yellow-200', glowFrom: 'from-yellow-500/10', glowTo: 'to-yellow-600/10' },
  red: { badgeBg: 'bg-red-50', badgeText: 'text-red-700', ring: 'ring-red-200', glowFrom: 'from-red-500/10', glowTo: 'to-red-600/10' },
  green: { badgeBg: 'bg-green-50', badgeText: 'text-green-700', ring: 'ring-green-200', glowFrom: 'from-green-500/10', glowTo: 'to-green-600/10' },
  gray: { badgeBg: 'bg-gray-50', badgeText: 'text-gray-700', ring: 'ring-gray-200', glowFrom: 'from-gray-400/10', glowTo: 'to-gray-500/10' },
};

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: <Award className="w-10 h-10" aria-hidden="true" />,
    title: 'Unparalleled Expertise',
    description: 'Years of industry experience and cutting-edge knowledge to deliver exceptional results.',
    accent: 'blue',
  },
  {
    icon: <Target className="w-10 h-10" aria-hidden="true" />,
    title: 'Client-Centric',
    description: 'Your success is our priority. We tailor solutions to meet your unique business needs.',
    accent: 'yellow',
  },
  {
    icon: <RefreshCw className="w-10 h-10" aria-hidden="true" />,
    title: 'Continuous Refinement',
    description: 'We constantly evolve and improve our processes to stay ahead of industry trends.',
    accent: 'red',
  },
  {
    icon: <Users className="w-10 h-10" aria-hidden="true" />,
    title: 'Customer Satisfaction',
    description: 'Proven track record of delivering projects that exceed client expectations.',
    accent: 'green',
  },
];

function ChooseUs({
  title = 'Why You Choose Us',
  subtitle = 'We combine expertise, innovation, and dedication to deliver solutions that drive your business forward.',
  features = DEFAULT_FEATURES,
  className = '',
  cardClassName = '',
  rounded = '2xl',
  showAccentGlow = true,
  ariaLabel,
}: ChooseUsProps) {
  const roundedClass = rounded === 'lg' ? 'rounded-lg' : rounded === 'xl' ? 'rounded-xl' : 'rounded-2xl';

  return (
    <section
      aria-labelledby="choose-us-heading"
      aria-label={ariaLabel}
      className={`bg-white py-20 px-6 relative mt-20 overflow-hidden ${className}`}
    >
      {/* Bottom fade into gray-200 for visual depth */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-gray-200" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="choose-us-heading" className="text-4xl md:text-5xl font-bold text-slate-700 mb-4">
            {title.split('Choose Us').length > 1 ? (
              <>
                {title.split('Choose Us')[0]}
                <span className="text-slate-700">Choose Us</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const accent = feature.accent ?? 'gray';
            const styles = ACCENT_STYLES[accent];
            return (
              <li
                role="listitem"
                key={index}
                tabIndex={0}
                className={`group relative bg-white border border-gray-200 ${roundedClass} p-8 shadow-sm transition-all duration-300 hover:shadow-md focus-visible:shadow-md hover:translate-y-[1px] focus-visible:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 ${styles.ring} ${cardClassName}`}
                aria-label={feature.title}
              >
                {/* Icon badge */}
                <div className={`inline-flex items-center justify-center p-4 ${roundedClass} ${styles.badgeBg} ring-1 ${styles.ring}`}>
                  <div className={`${styles.badgeText}`}>{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mt-6">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mt-2">
                  {feature.description}
                </p>

                {/* Subtle accent glow on hover */}
                {showAccentGlow && (
                  <div className={`pointer-events-none absolute inset-0 ${roundedClass} bg-gradient-to-r ${styles.glowFrom} ${styles.glowTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ChooseUs;