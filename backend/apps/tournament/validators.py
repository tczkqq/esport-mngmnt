def validate_svg(file, valid):
    if not is_svg(file):
        raise ValidationError("File not svg")
