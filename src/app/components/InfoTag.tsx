interface InfoTagProps {
  label: string;
}
export default function InfoTag({ label }: InfoTagProps) {
  return (
    <div className="info_tag">
      <p className="info_tag-label">{label}</p>
    </div>
  )
}