interface TeamMemberProps {
  name: string
  title: string
  image: string
}

const TeamMember = ({ name, title, image }: TeamMemberProps) => {
  return (
    <div className="text-center">
      <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-primary font-medium">{title}</p>
    </div>
  )
}

export default TeamMember