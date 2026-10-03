export default function DebugPage() {
  return (
    <>
      <h2 className="govuk-heading-l govuk-!-margin-top-3">Debug stránka</h2>
      <button
        className="govuk-button"
        onClick={() => {
          document.cookie = 'you-shall=not-pass'
          window.location.href = '/'
        }}
      >
        Zapnúť DEBUG mode
      </button>
      <br />
      <button
        className="govuk-button btn-secondary"
        onClick={() => {
          document.cookie = 'you-shall=; Max-Age=0'
          window.location.href = '/'
        }}
      >
        Vypnúť DEBUG mode
      </button>
    </>
  )
}
