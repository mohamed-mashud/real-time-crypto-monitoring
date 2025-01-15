import PropTypes from 'prop-types';

export function Heading({ title }) {
    return (
        <h1 className="font-bold text-4xl pt-6">{title}</h1>
    )
}

Heading.propTypes = {
    title: PropTypes.string,
};