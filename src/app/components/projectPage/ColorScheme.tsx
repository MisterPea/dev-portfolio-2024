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
          <h4>{label}</h4>
          <p>{hex}</p>
          {cr && <p>{`CR = ${cr} : 1`}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="project_page-color_section project_page-subsection">
      <h4>Palette:</h4>
      <div className="project_page-color_section-colors">
        {colorSet.map(({ label, hex, cr }) => (
          <ColorSwatch label={label} hex={hex} cr={cr} key={hex} />
        ))}
      </div>
    </div>
  );
}