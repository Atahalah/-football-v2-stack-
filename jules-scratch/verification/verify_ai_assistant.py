from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This test verifies that the AI Assistant tab is present and that the
    chat interface loads correctly.
    """
    # 1. Arrange: Go to the application's homepage.
    # The dev server is running on the default Vite port 5173.
    page.goto("http://localhost:5173")

    # 2. Act: Find the "AI Assistant" tab and click it.
    ai_assistant_tab = page.get_by_role("tab", name="AI Assistant")
    expect(ai_assistant_tab).to_be_visible()
    ai_assistant_tab.click()

    # 3. Assert: Check that the chat input and initial message are visible.
    expect(page.get_by_placeholder("Ask the AI Assistant...")).to_be_visible()
    expect(page.get_by_text("Hello! I'm your AI Assistant. How can I help you with this match?")).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/ai_assistant_verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()