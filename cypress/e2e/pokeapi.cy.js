describe('Kiểm thử API (Backend)', () => {
  it('Gọi API lấy thông tin Pokemon Ditto và kiểm tra Status', () => {
    
    // Sử dụng cy.request để gọi thẳng xuống API mà không cần mở giao diện web
    cy.request('GET', 'https://pokeapi.co/api/v2/pokemon/ditto').then((response) => {
      
      // 1. Kiểm chứng Mã trạng thái (Status Code) trả về phải là 200 (Thành công)
      expect(response.status).to.eq(200);
      
      // 2. Kiểm chứng dữ liệu trả về (Body)
      // Chắc chắn rằng cục data trả về có chứa thuộc tính 'name' với giá trị là 'ditto'
      expect(response.body).to.have.property('name', 'ditto');
      
      // Chắc chắn dữ liệu có chứa danh sách các kỹ năng (abilities)
      expect(response.body.abilities).to.be.an('array').that.is.not.empty;
      
      // Bạn có thể in toàn bộ dữ liệu ra màn hình Console (F12) để xem thử
      cy.log('Dữ liệu API trả về:', response.body);
    });
  });

  it('Gọi API với Pokemon không tồn tại và kiểm tra lỗi 404', () => {
    
    // Khi test API lỗi (ví dụ 404, 500), mặc định Cypress sẽ đánh rớt luôn test case.
    // Để có thể chạy vào hàm then() và viết lệnh kiểm chứng (expect) cho mã lỗi,
    // ta phải truyền thêm failOnStatusCode: false
    cy.request({
      method: 'GET', 
      url: 'https://pokeapi.co/api/v2/pokemon/mot_con_pokemon_khong_ton_tai',
      failOnStatusCode: false // Quan trọng: Yêu cầu Cypress không đánh rớt test này!
    }).then((response) => {
      
      // Kiểm chứng rằng mã trạng thái (status code) trả về phải là 404 (Không tìm thấy)
      expect(response.status).to.eq(404);
      
      // API thường trả về chữ 'Not Found' khi lỗi
      expect(response.body).to.eq('Not Found');
    });
    
  });
});
