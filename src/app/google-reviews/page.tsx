'use client'
import React, { useEffect } from 'react'
import { ElfsightWidget } from 'react-elfsight-widget'

function GoogleReviews() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const badge = document.querySelector('a[href*="elfsight.com/google-reviews-widget"]');
      if (badge) {
        badge.remove(); // or badge.style.display = "none";
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <ElfsightWidget widgetId='8249fbce-39f8-4ae7-9cab-fa0f6e4c0b2a' />
    </div>
  )
}

export default GoogleReviews
