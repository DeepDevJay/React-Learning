interface LinkProps {
  link: {
    description: string;
    url: string;
  };
}

const Link = ({ link }: LinkProps) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;