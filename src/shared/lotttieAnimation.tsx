
import Lottie from "lottie-react";

type LottieLoaderProps = {
  /** lottie JSON object (imported or fetched) */
  animationData: any;
  /** size in px or tailwind classes (e.g. "w-24 h-24") -- default 64px */
  size?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  ariaLabel?: string;
} ;

export default function LottieLoader({
  animationData,
  size = 64,
  loop = true,
  autoplay = true,
  className = "",
  ariaLabel = "Loading",
  ...rest
}: LottieLoaderProps) {
  // allow numeric pixel size or a tailwind-like string
  const style =
    typeof size === "number"
      ? { width: size, height: size }
      : undefined;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`flex items-center justify-center ${className} min-h-screen`}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={style}
        {...rest}
      />
      {/* visually-hidden label for screen readers */}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
