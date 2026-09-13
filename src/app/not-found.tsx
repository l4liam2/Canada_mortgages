import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="narrow" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">404</p>
        <h1 className="mt-4 text-4xl text-ink sm:text-5xl">That page has moved out</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          The link may be old or mistyped. Head back home or get in touch and we&apos;ll point you in
          the right direction.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact Chad
          </Button>
        </div>
      </Container>
    </section>
  );
}
