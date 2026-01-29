import { useEffect, useRef } from 'react';

type TiltAction = 'left' | 'right';

interface UseDeviceTiltOptions {
  onTilt: (action: TiltAction) => void;
  enabled: boolean;
  threshold?: number;
  resetThreshold?: number;
  cooldownMs?: number;
}

/**
 * Request permission for device orientation events (required on iOS 13+).
 * Must be called from a user gesture (e.g. button tap).
 */
export async function requestTiltPermission(): Promise<boolean> {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  if (typeof DOE.requestPermission === 'function') {
    try {
      const result = await DOE.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }
  // Android and older iOS don't need explicit permission
  return true;
}

/**
 * Detects left/right tilt of the device and fires an action.
 * Accounts for screen orientation (portrait vs landscape) so the tilt
 * direction always matches what the user sees on screen.
 *
 * The action fires once per tilt gesture: after triggering, the device
 * must return to near-level before it can trigger again.
 */
export function useDeviceTilt({
  onTilt,
  enabled,
  threshold = 25,
  resetThreshold = 10,
  cooldownMs = 400,
}: UseDeviceTiltOptions) {
  const cooldownRef = useRef(false);
  const triggeredRef = useRef(false);
  const onTiltRef = useRef(onTilt);
  onTiltRef.current = onTilt;

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (beta === null || gamma === null) return;

      // Map device orientation to visual left-right tilt based on screen rotation.
      // In landscape the device axes are rotated relative to the screen,
      // so we use beta (device X-axis rotation) instead of gamma.
      const angle = screen.orientation?.angle ?? 0;
      let tilt: number;

      switch (angle) {
        case 90: // landscape-primary (device rotated CCW)
          tilt = 90 - beta;
          break;
        case 270: // landscape-secondary (device rotated CW)
          tilt = beta - 90;
          break;
        case 180: // portrait upside-down
          tilt = -gamma;
          break;
        default: // portrait (0)
          tilt = gamma;
          break;
      }

      // Reset trigger when phone returns to near-level
      if (Math.abs(tilt) < resetThreshold) {
        triggeredRef.current = false;
        return;
      }

      if (triggeredRef.current || cooldownRef.current) return;

      let action: TiltAction | null = null;
      if (tilt < -threshold) {
        action = 'left';
      } else if (tilt > threshold) {
        action = 'right';
      }

      if (action) {
        triggeredRef.current = true;
        cooldownRef.current = true;

        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        onTiltRef.current(action);

        setTimeout(() => {
          cooldownRef.current = false;
        }, cooldownMs);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enabled, threshold, resetThreshold, cooldownMs]);
}
