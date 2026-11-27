import { App } from './app';

describe('App Component Test', () => {
  it('Hiển thị đúng form và tương tác trực tiếp với Component', () => {
    
    // Bước quan trọng nhất trong Component Test:
    // Thay vì dùng cy.visit('http://localhost...')
    // Ta dùng cy.mount() để nhúng trực tiếp độc lập Component này vào trình duyệt ảo.
    cy.mount(App);

    // 1. Kiểm tra xem Component có vẽ ra đúng thẻ HTML không
    cy.get('h2').should('be.visible').and('contain', 'Đăng Nhập');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');

    // 2. Thử tương tác (Gõ chữ, bấm nút) ngay trên Component đó
    cy.get('#email').type('khachhang@gmail.com');
    cy.get('#password').type('matkhau_khong_dung');
    cy.get('#btn-login').click();

    // 3. Kiểm tra logic của Component: Phải hiển thị lỗi
    cy.get('#error-msg')
      .should('be.visible')
      .and('contain', 'Email hoặc mật khẩu không đúng!');
  });
});
