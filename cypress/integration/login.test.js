describe('検索機能のテスト', () => {
  // テストケース(it関数）の直前で実行される
  beforeEach(() => {
    // Cypressコマンドのタイムアウト値を60秒に設定。（デフォルトは4秒）
    Cypress.config('defaultCommandTimeout', 60000)
    // 画面のサイズ指定
    cy.viewport(1940, 1080)
    // テスト開始時、どのURLにアクセスするかを指定
    cy.visit('http://localhost:3000/')
    // ログインをするための、カスタムコマンド（後述）
    // cy.login('user')
  })
  // テストケース(it関数）の直後で実行される
  afterEach(() => {
    cy.contains('GAME').click()
  })

  // テストケース
  it('検索ができること', () => {
    // 目的の画面へ移動するためのカスタムコマンド（後述）
    cy.gotoTestPage()
    cy.contains('GAME').matchImageSnapshot()
    cy.wait(2000)
  })
})
