describe('Kiểm thử chức năng Đăng nhập', () => {
  // Lệnh này chạy trước mỗi test case
  beforeEach(() => {
    // Truy cập vào trang local của Angular
    cy.visit('http://localhost:4200');
  });

  it('1. Đăng nhập thành công', () => {
    // Tìm ô email và gõ tài khoản đúng
    cy.get('#email').type('admin@gmail.com');
    
    // Tìm ô password và gõ mật khẩu đúng
    cy.get('#password').type('123456');
    
    // Click vào nút Login
    cy.get('#btn-login').click();
    
    // Kiểm chứng (Assertion): Phải hiện thông báo thành công màu xanh
    cy.get('#success-msg')
      .should('be.visible')
      .and('contain', 'Đăng nhập thành công!');
      
    // Đảm bảo thông báo lỗi không xuất hiện
    cy.get('#error-msg').should('not.exist');
  });

  it('2. Đăng nhập thất bại (Sai mật khẩu)', () => {
    cy.get('#email').type('admin@gmail.com');
    cy.get('#password').type('sai_mat_khau_ne');
    cy.get('#btn-login').click();
    
    // Kiểm chứng: Phải hiện thông báo lỗi
    cy.get('#error-msg')
      .should('not.be.hidden')
      .and('contain', 'Email hoặc mật khẩu không đúng!');
  });

  it('3. Kiểm tra bắt buộc nhập (Required fields)', () => {
    // Không nhập gì cả, bấm nút Login luôn
    cy.get('#btn-login').click();
    
    // Kiểm chứng: Phải báo lỗi yêu cầu nhập đầy đủ
    cy.get('#error-msg')
      .should('be.visible')
      .and('contain', 'Vui lòng nhập đầy đủ Email và Mật khẩu');
  });
});
