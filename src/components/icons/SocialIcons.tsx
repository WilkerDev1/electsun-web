import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

// ─── WhatsApp ───────────────────────────────────────────────────────────────
export const WhatsAppIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.031 0C5.397 0 .017 5.38.017 12.014c0 2.118.553 4.186 1.604 6.007L0 24l6.164-1.617c1.758.96 3.746 1.465 5.867 1.465 6.634 0 12.014-5.38 12.014-12.014S18.665 0 12.031 0zm.014 21.84c-1.808 0-3.578-.486-5.122-1.402l-.367-.218-3.805.998 1.016-3.71-.24-.38a9.832 9.832 0 0 1-1.507-5.114c0-5.432 4.418-9.85 9.85-9.85 5.433 0 9.851 4.418 9.851 9.85 0 5.433-4.418 9.826-9.676 9.826zm5.39-7.375c-.296-.148-1.75-.864-2.022-.962-.271-.099-.469-.148-.667.148-.198.297-.766.963-.939 1.16-.173.198-.346.223-.642.075-.296-.149-1.25-.461-2.38-1.47-.88-.785-1.474-1.756-1.647-2.053-.173-.297-.018-.458.13-.606.134-.133.297-.346.446-.52.148-.172.197-.296.296-.494.099-.197.05-.37-.025-.519-.074-.148-.667-1.607-.914-2.201-.24-.579-.485-.5-.667-.51h-.569c-.198 0-.519.074-.79.37-.272.297-1.038 1.014-1.038 2.473s1.063 2.868 1.212 3.066c.148.198 2.093 3.198 5.07 4.483.708.306 1.261.489 1.692.626.711.226 1.358.194 1.87.118.571-.086 1.75-.716 1.998-1.408.247-.692.247-1.285.173-1.409-.074-.123-.272-.197-.568-.345z" />
  </svg>
);

// ─── Phone ──────────────────────────────────────────────────────────────────
export const PhoneIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// ─── LinkedIn ───────────────────────────────────────────────────────────────
export const LinkedInIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

// ─── Email ──────────────────────────────────────────────────────────────────
export const EmailIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22,4 12,13 2,4" />
  </svg>
);

// ─── Instagram ──────────────────────────────────────────────────────────────
export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// ─── X / Twitter ────────────────────────────────────────────────────────────
export const XTwitterIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Arrow Up-Right ─────────────────────────────────────────────────────────
export const ArrowUpRightIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

// ─── Link (Chain) ───────────────────────────────────────────────────────────
export const LinkIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ─── Icon Map ───────────────────────────────────────────────────────────────
export const iconMap: Record<string, React.FC<IconProps>> = {
  whatsapp: WhatsAppIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  mail: EmailIcon,
  instagram: InstagramIcon,
  twitter: XTwitterIcon,
  x: XTwitterIcon,
  link: LinkIcon,
  'arrow-up-right': ArrowUpRightIcon,
  external: ArrowUpRightIcon,
};
