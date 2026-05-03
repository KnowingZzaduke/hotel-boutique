interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders a JSON-LD structured data script tag — must be a server component leaf node */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
