import PropTypes from 'prop-types';

export default function SubHeading({ title }) {
    return (
        <h2 className="flex flex-left text-center text-2l text-black">{title}</h2>
    )
}

SubHeading.propTypes = {
    title: PropTypes.string.isRequired,
};