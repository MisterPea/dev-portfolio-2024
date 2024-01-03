export type ColorSwatchType = {
  // Hex of the color
  hex: string,
  // Contrast ratio
  cr?: number,
  // Color name
  label: string,
};
interface ColorSchemeProps {
  colorSet: ColorSwatchType[];
}

export default function ColorScheme({ colorSet }: ColorSchemeProps) {
  function ColorSwatch({ hex, cr, label }: ColorSwatchType) {
    return (
      <div className="color_swatch-wrap">
        <div className="color_swatch-square" style={{ backgroundColor: `${hex}` }} />
        <div className="color_swatch-text_group">
          <h3>{label}</h3>
          <p>{hex}</p>
          {cr && <p>{`CR = ${cr} : 1`}</p>}
        </div>
      </div>
    );
  }

  return (
    <section className="project_page-section project_page-color_section">
      <h2>Color Scheme:</h2>
      <div className="project_page-color_section-colors">
        {colorSet.map(({ label, hex, cr }) => (
          <ColorSwatch label={label} hex={hex} cr={cr} key={hex} />
        ))}
      </div>
    </section>
  );
}