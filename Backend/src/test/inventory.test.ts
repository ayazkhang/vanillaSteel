import Inventory from '../modals/Inventory';


describe('Inventory Model', () => {
  it('should create a new inventory record', async () => {
    const inventoryData = {
      productNumber: 1001,
      material: 'Steel',
      form: 'Sheet',
      choice: 'A',
      grade: 'A36',
      surface: 'Smooth',
      finish: 'Polished',
      quantity: 50,
      weight: 1000.5,
      length: 200,
      width: 100,
      height: 50,
      thickness: 2.5,
      location: 'Warehouse A',
    };

    const createdInventory = await Inventory.create(inventoryData);

    expect(createdInventory.productNumber).toEqual(1001);
    expect(createdInventory.material).toEqual('Steel');
    expect(createdInventory.form).toEqual('Sheet');
    expect(createdInventory.quantity).toEqual(50);
    expect(createdInventory.weight).toEqual(1000.5);
  });

  it('should retrieve an inventory record by product number', async () => {
    const inventoryData = {
      productNumber: 1002,
      material: 'Aluminum',
      form: 'Rod',
      choice: 'B',
      grade: '6061-T6',
      surface: 'Matte',
      finish: 'Anodized',
      quantity: 100,
      weight: 500.2,
      length: 300,
      width: 120,
      height: 60,
      thickness: 5.0,
      location: 'Warehouse B',
    };

    await Inventory.create(inventoryData);

    const foundInventory = await Inventory.findOne({
      where: { productNumber: 1002 },
    });

    expect(foundInventory).not.toBeNull();
    expect(foundInventory?.material).toEqual('Aluminum');
    expect(foundInventory?.form).toEqual('Rod');
    expect(foundInventory?.grade).toEqual('6061-T6');
  });
});
