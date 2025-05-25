export class Figure {
  public id: string;
  public name: string;
  public color: string;
  public geometryType: 'BOX' | 'SPHERE' | 'CYLINDER';
 public size: number;

  constructor(id: string, name: string, color: string, geometryType: 'BOX' | 'SPHERE' | 'CYLINDER', size: number)
  {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.color = color;
        this.geometryType = geometryType;
        this.size = size;
  }
      
  rename(updatedName: string) :void {
    this.name = updatedName;
}
  }